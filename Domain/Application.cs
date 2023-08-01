using System;

namespace Domain
{
    public class Application
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Guid PropertyId { get; set; }
        public Property Property { get; set; }
        public Guid ReferenceNumber { get; set; }
        public DateTime CreationDate { get; set; }
        public string Status { get; set; }
    }
}