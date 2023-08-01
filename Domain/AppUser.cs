using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string FamilyName { get; set; }
        public string About { get; set; }
        public string Phone { get; set; }
        public string Mobile { get; set; }
        public string UserType { get; set; }
        public string Status { get; set; }
        public string Profesion { get; set; }
        public string RelationshipStatus { get; set; }
        public decimal SalaryPerYear { get; set; }
        public string Country { get; set; }
        public bool IsAdult { get; set; }
        public string City { get; set; }
        public string Postcode { get; set; }
        public bool IsIndigenous { get; set; }
        public int? IndigenousType { get; set; }

        public ICollection<Application> Applications { get; set; }
        public ICollection<UserJob> UserJobs { get; set; }
        public ICollection<UserReference> UserReferences { get; set; }
        public ICollection<PropertyOwner> PropertyOwners { get; set; }
        public ICollection<Photo> Photos { get; set; }
    }
}