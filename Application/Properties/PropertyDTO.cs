using System;
using System.Collections.Generic;

namespace Application.Properties
{
    public class PropertyDTO
    {
        public Guid Id { get; set; }
        public string Address { get; set; }
        public int Rooms { get; set; }
        public int Bathrooms { get; set; }
        public int CarsParking { get; set; }
        public decimal Price { get; set; }
        public decimal Area { get; set; }
        public decimal PriceBySqm { get; set; }
        public string Description { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string Suburb { get; set; }
        public string City { get; set; }
        public string PostCode { get; set; }
        public DateTime CreationDate { get; set; }
        public string Status { get; set; }
        public string ImageUrl { get; set; }
        public IEnumerable<Domain.PropertyPhoto> PropertyPhotos { get; set; }
    }
}