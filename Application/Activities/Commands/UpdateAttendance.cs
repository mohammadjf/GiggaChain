using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Commands;

public class UpdateAttendance
{
	public class Command : IRequest<Result<Unit>>
	{
		public required string Id { get; set; }
	}

	public class Handler(IUserAccessor userAccessor, AppDbContext context) : IRequestHandler<Command, Result<Unit>>
	{
		public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
		{
			var activity = await context.Activities
				.Include(a => a.Attendees)
				.SingleOrDefaultAsync(a => a.Id == request.Id, cancellationToken: cancellationToken);
			if (activity == null) return Result<Unit>.Failure("Activity not found", 404);
			var userId = userAccessor.GetUserId();

			var attendee = activity.Attendees.FirstOrDefault(x => x.UserId == userId);

			if (attendee is null)
			{
				activity.Attendees.Add(new ActivityAttendee()
				{
					UserId = userId,
					ActivityId = activity.Id,
					IsHost = false,
				});
			}
			else if (attendee.IsHost)
			{
				activity.IsCancelled = !activity.IsCancelled;
			}
			else
			{
				activity.Attendees.Remove(attendee);
			}

			var result = await context.SaveChangesAsync(cancellationToken) > 0;
			return result
				? Result<Unit>.Success(Unit.Value)
				: Result<Unit>.Failure("Problem in saving changes", 400);
		}
	}
}