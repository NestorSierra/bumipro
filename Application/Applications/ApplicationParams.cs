using System;
using Application.Core;

namespace Application.Applications
{
    public class ApplicationParams : PagingParams
    {
        public Guid? PropertyId { get; set; }
    }
}