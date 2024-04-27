using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

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
                for (int i = 1; i <= 100; i++)
                {
                    var properties = new Property
                    {
                        Id = Guid.NewGuid(),
                        Address = $"Calle {i} B # {65 + i} - {51 + i} sur",
                        Area = 100,
                        Bathrooms = 2,
                        Country = "Colombia",
                        City = "Bogota",
                        CreationDate = DateTime.UtcNow,
                        Description = "Esta propiedad se encuentra en pruebas",
                        PostCode = "6000",
                        Price = 200000000 + i,
                        Rooms = 5,
                        PriceBySqm = 15000 + i,
                        State = "T",
                        Status = "A",
                        Category = "house"
                    };

                    context.Properties.Add(properties);
                }

                await context.SaveChangesAsync();
            }

            if (!context.PropertyOwners.Any())
            {
                var properties = context.Properties.ToList();
                var mainOwner = context.Users.FirstOrDefault();

                foreach (var property in properties)
                {
                    var propertyOwner = new PropertyOwner
                    {
                        AppUserId = mainOwner.Id,
                        PropertyId = property.Id,
                        CreationDate = DateTime.UtcNow,
                    };

                    context.PropertyOwners.Add(propertyOwner);
                }

                await context.SaveChangesAsync();
            }


        }
    }
}