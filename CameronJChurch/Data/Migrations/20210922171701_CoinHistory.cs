using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CameronJChurch.Data.Migrations
{
    public partial class CoinHistory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "Cost",
                table: "Coins",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "REAL");

            migrationBuilder.AlterColumn<decimal>(
                name: "Amount",
                table: "Coins",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "REAL");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "Coins",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "CoinHistory",
                columns: table => new
                {
                    CoinHistoryId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CoinId = table.Column<int>(type: "INTEGER", nullable: false),
                    Cost = table.Column<decimal>(type: "TEXT", nullable: false),
                    Amount = table.Column<decimal>(type: "TEXT", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CoinHistory", x => x.CoinHistoryId);
                    table.ForeignKey(
                        name: "FK_CoinHistory_Coins_CoinId",
                        column: x => x.CoinId,
                        principalTable: "Coins",
                        principalColumn: "CoinId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CoinHistory_CoinId",
                table: "CoinHistory",
                column: "CoinId");

            migrationBuilder.Sql("CREATE TRIGGER coinHistoryTrigger AFTER UPDATE on Coins BEGIN INSERT INTO CoinHistory(CoinId, Cost, Amount, CreatedDate) VALUES(OLD.CoinId, OLD.Cost, OLD.Amount, datetime()); END;");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CoinHistory");

            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "Coins");

            migrationBuilder.AlterColumn<double>(
                name: "Cost",
                table: "Coins",
                type: "REAL",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<double>(
                name: "Amount",
                table: "Coins",
                type: "REAL",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "TEXT");

            migrationBuilder.Sql("DROP TRIGGER coinHistoryTrigger");
        }
    }
}
