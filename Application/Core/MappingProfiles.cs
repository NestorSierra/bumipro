using System.Linq;
using Application.Applications;
using Application.Properties;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Domain.Application, ApplicationDTO>();
            CreateMap<Domain.Property, PropertyDTO>()
            .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src => src.PropertyPhotos.FirstOrDefault(t => t.IsMain).Url));
            CreateMap<PropertyDTO, Domain.Property>();
            CreateMap<AppUser, Profiles.Profile>()
            .ForMember(dest => dest.Image, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(t => t.IsMain).Url))
            .ForMember(dest => dest.DisplayName, opt => opt.MapFrom(src => $"{src.FirstName} {src.FamilyName}"))
            .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.FamilyName));
            CreateMap<Profiles.Profile, AppUser>();
            CreateMap<Profiles.ProfileFormValues, AppUser>()
            .ForMember(dest => dest.FamilyName, opt => opt.MapFrom(src => src.LastName));
        }
    }
}