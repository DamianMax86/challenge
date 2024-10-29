using Microsoft.EntityFrameworkCore;
using ReservasApi.Models;
using System.Collections.Generic;

namespace ReservasApi.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Reserva> Reservas { get; set; }
    }
}
