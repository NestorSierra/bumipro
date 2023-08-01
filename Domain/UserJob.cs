using System;
using System.Collections.Generic;

namespace Domain
{
    public class UserJob
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string BusinessName { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public bool IsActive { get; set; }
        public string JobType { get; set; }
    }
}