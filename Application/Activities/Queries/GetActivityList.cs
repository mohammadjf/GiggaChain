using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityList
{
	public class Query : IRequest<Result<List<Activity>>>
	{
	}

	public class Handler(AppDbContext context, ILogger<GetActivityList> logger)
		: IRequestHandler<Query, Result<List<Activity>>>
	{
		public async Task<Result<List<Activity>>> Handle(Query request, CancellationToken cancellationToken)
		{
			var result = await context.Activities.ToListAsync(cancellationToken);
			return Result<List<Activity>>.Success(result);
		}
	}
}