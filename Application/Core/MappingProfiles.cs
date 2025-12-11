using Application.Activities.DTOs;
using Application.Profiles.DTOs;
using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfiles : Profile
{
	public MappingProfiles()
	{
		CreateMap<Activity, Activity>();
		CreateMap<CreateActivityDto, Activity>();
		CreateMap<EditActivityDto, Activity>();
		CreateMap<Activity, ActivityDto>()
			.ForMember(dest => dest.HostDisplayName,
				o => o.MapFrom(s => s.Attendees.First(x => x.IsHost).User.DisplayName))
			.ForMember(dest => dest.HostId,
				o => o.MapFrom(s => s.Attendees.First(x => x.IsHost).User.Id));
		CreateMap<ActivityAttendee, UserProfileDto>()
			.ForMember(dest => dest.Id, o => o.MapFrom(s => s.User.Id))
			.ForMember(dest => dest.DisplayName, o => o.MapFrom(s => s.User.DisplayName))
			.ForMember(dest => dest.Bio, o => o.MapFrom(s => s.User.Bio))
			.ForMember(dest => dest.ImageUrl, o => o.MapFrom(s => s.User.ImageUrl));
	}
}