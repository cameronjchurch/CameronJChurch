﻿using CameronJChurch.Models;
using Duende.IdentityServer.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace CameronJChurch.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<CameronJChurchUser>
    {
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }

        public virtual DbSet<Log> Logs { get; set; }
        public virtual DbSet<Bill> Bills { get; set; }
        public virtual DbSet<BillTemplate> BillTemplates { get; set; }
        public virtual DbSet<Coin> Coins { get; set; }
        public virtual DbSet<CoinTotal> CoinTotalHistory { get; set; }
        public virtual DbSet<CoinTemplate> CoinTemplates { get; set; }
        public virtual DbSet<ExerciseActivityDay> ExerciseActivityDay { get; set; }
        public virtual DbSet<ExerciseActivity> ExerciseActivity { get; set; }
    }
}
