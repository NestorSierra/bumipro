using System;

namespace Domain
{
    public class UserReference
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string FamilyName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public DateTime CreationDate { get; set; }
        public string Status { get; set; }
        public bool IsActive { get; set; }
        public string UserId { get; set; }
        public AppUser User { get; set; }
    }
}