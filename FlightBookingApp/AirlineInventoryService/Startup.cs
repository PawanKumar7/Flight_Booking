using AirlineInventoryService.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AirlineInventoryService.Models.Interface;
using AirlineInventoryService.Models.Repository; 
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using AirlineInventoryService.Models.Auth;
using AirlineInventoryService.Rabbitmq;

namespace AirlineInventoryService
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            var appSettingSection = Configuration.GetSection("AppSetting");
            services.Configure<AppSetting>(appSettingSection);

            var appSetting = appSettingSection.Get<AppSetting>();
            var key = Encoding.ASCII.GetBytes(appSetting.key);

            services.AddAuthentication(au =>
            {
                au.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                au.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(jwt =>
            {
                jwt.RequireHttpsMetadata = false;
                jwt.SaveToken = true;
                jwt.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
            };
        });
            services.AddScoped<IAuthenticationService, AuthenticationService>();
            services.AddScoped<IAirlineServiceRepository, AirlineServiceRepository>();
            services.AddScoped<IBookingRepository, BookingRepository>();
            //services.AddHostedService<Consumer>();

            services.AddDbContext<AirlineDataContext>(option =>
            option.UseSqlServer(Configuration.GetConnectionString("SQLConnection")));

            services.AddScoped<IAirlineServiceRepository, AirlineServiceRepository>();
            services.AddScoped<IBookingRepository, BookingRepository>();

            services.AddSingleton<IConsumer, Consumer>();

            services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    builder.WithOrigins("http://localhost:4200")
                    .AllowAnyMethod()
                    .AllowAnyHeader();
                });
            });

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }
            app.UseAuthentication();
            app.UseHttpsRedirection();

            app.UseCors(builder => builder.WithOrigins("http://localhost:4200").
            AllowAnyHeader().
            AllowAnyMethod());
            app.UseMvc();
        }
    }
}
