using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Properties
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }
            public PropertyDTO PropertyDTO { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {

                var user = await _context.Users.FirstOrDefaultAsync(usr => usr.UserName == _userAccessor.GetUsername());
                var property = _mapper.Map<Property>(request.PropertyDTO);

                var propertyOwner = new Domain.PropertyOwner
                {
                    AppUser = user,
                    Property = property
                };

                property.PropertyOwners.Add(propertyOwner);

                _context.Properties.Add(property);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create property");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}