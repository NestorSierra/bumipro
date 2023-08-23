using System;
using Application.Applicant;
using Application.Properties;

namespace Application.Applications
{
    public class ApplicationDTO
    {
        public string AppUserId { get; set; }
        public Guid PropertyId { get; set; }
        public string PropertyAddress { get; set; }
        public Guid ReferenceNumber { get; set; }
        public DateTime CreationDate { get; set; }
        public PropertyDTO Property { get; set; }
        public ApplicantDTO Applicant { get; set; }
        public string Status { get; set; }
    }

}