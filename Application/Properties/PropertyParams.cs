using System;
using Application.Core;

namespace Application.Properties
{
    public class PropertyParams : PagingParams
    {
        public string Location { get; set; }
        public string Category { get; set; } = "all";
        public string Country { get; set; }
    }
}