namespace Application.Applicant
{
    public class ApplicantDTO
    {
        public string Id { get; set; }
        public string DisplayName { get; set; }
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
        public string Image { get; set; }
    }
}