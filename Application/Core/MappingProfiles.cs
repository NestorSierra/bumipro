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

            CreateMap<Property, PropertyDTO>()
            .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src => src.PropertyPhotos.FirstOrDefault(t => t.IsMain).Url));
            CreateMap<PropertyDTO, Property>()
                .ForMember(dest => dest.SearchLocation, opt => opt.MapFrom(src => string.Concat(src.Address, "_", src.Country, "_", src.State, "_", src.City, "_", src.Suburb, "_", src.PostCode)));
            CreateMap<AppUser, Profiles.Profile>()
            .ForMember(dest => dest.Image, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(t => t.IsMain).Url))
            .ForMember(dest => dest.DisplayName, opt => opt.MapFrom(src => $"{src.FirstName} {src.FamilyName}"))
            .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.FamilyName));
            CreateMap<AppUser, Applicant.ApplicantDTO>()
             .ForMember(dest => dest.Image, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(t => t.IsMain).Url))
             .ForMember(dest => dest.DisplayName, opt => opt.MapFrom(src => $"{src.FirstName} {src.FamilyName}"));
            CreateMap<ApplicationDTO, Domain.Application>();

            CreateMap<Profiles.Profile, AppUser>();
            CreateMap<Profiles.ProfileFormValues, AppUser>()
            .ForMember(dest => dest.FamilyName, opt => opt.MapFrom(src => src.LastName));

            #region Custom Mapping
            CreateMap<Domain.Application, ApplicationDTO>()
            .ForMember(dest => dest.Applicant, opt => opt.MapFrom(src => src.AppUser))
            .ForMember(dest => dest.PropertyAddress, opt => opt.MapFrom(src => src.Property.Address))
            .ForMember(dest => dest.Status, opt => opt.MapFrom(src => Enums.ApplicationStatusEnums.GetName(src.Status)));
            #endregion
        }


    }
}