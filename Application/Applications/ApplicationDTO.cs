using System;

namespace Application.Applications
{
    public class ApplicationDTO
    {
        public string AppUserId { get; set; }
        public Guid PropertyId { get; set; }
        public string AppUserName { get; set; }
        public string PropertyAddress { get; set; }
        public Guid ReferenceNumber { get; set; }
        public DateTime CreationDate { get; set; }
        public string Status { get; set; }
    }
}