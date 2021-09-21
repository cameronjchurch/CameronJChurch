using Microsoft.EntityFrameworkCore.Migrations;

namespace CameronJChurch.Data.Migrations
{
    public partial class CoinPriceRemoval : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Price",
                table: "Coins");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Price",
                table: "Coins",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
