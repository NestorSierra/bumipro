using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Applications
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public ApplicationDTO ApplicationDTO { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var currentApplication = await _context.Applications.FirstOrDefaultAsync(t => t.ReferenceNumber == request.ApplicationDTO.ReferenceNumber);

                if (currentApplication != null)
                {
                    var application = _mapper.Map<Domain.Application>(request.ApplicationDTO);

                    _context.Entry(currentApplication).State = EntityState.Detached;
                    _context.Entry(application).State = EntityState.Modified;

                    await _context.SaveChangesAsync();
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }

    }
}