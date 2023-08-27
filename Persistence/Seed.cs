using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>{
                    new AppUser{ FirstName = "Juan", FamilyName = "Alverto", UserName="juanalverto", Email="juanalverto@test.com"},
                    new AppUser{ FirstName = "Jane", FamilyName = "Troouble", UserName="janeTroouble", Email="janeTroouble@test.com"},
                    new AppUser{ FirstName = "John", FamilyName = "Torpedo", UserName="jhonTorpedo", Email="jhonTorpedo@test.com"},
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

            if (!context.Properties.Any())
            {
                var properties = new Property
                {
                    Id = Guid.NewGuid(),
                    Address = "Calle 57 B # 66 - 52 sur",
                    Area = 100,
                    Bathrooms = 2,
                    Country = "Colombia",
                    City = "Bogota",
                    CreationDate = DateTime.UtcNow,
                    Description = "Esta propiedad se encuentra en pruebas",
                    PostCode = "6000",
                    Price = 200000000,
                    Rooms = 5,
                    PriceBySqm = 15000,  
                    State = "T",
                    Status = "A"
                };

                context.Properties.Add(properties);

                await context.SaveChangesAsync();
            }
        }
    }
}