using System.Collections.Generic;

namespace Domain
{
    public class IndigenousType
    {
        public int Id { get; set; }
        public string Country { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
        public ICollection<AppUser> Users { get; set; }
    }
}