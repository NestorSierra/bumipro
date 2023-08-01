using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$", ErrorMessage = "Password must be complex")]
        public string Password { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string Username { get; set; }

        public string UserType { get; set; } = "C";

        public string FamilyName { get; set; }
        public string Phone { get; set; }
        public string Mobile { get; set; }
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

    }
}