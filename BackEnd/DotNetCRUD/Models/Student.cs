using Postgrest.Attributes;
using Postgrest.Models;

namespace DotNetCRUD.Models
{
    [Table("students")]
    public class Student
    {
        [PrimaryKey("id", false)]
        public int id { get; set; }

        [Column("name")]
        public string name { get; set; }

        [Column("age")]
        public int age { get; set; }

        [Column("inClass")]
        public int inClass { get; set; }

        [Column("grades")]
        public string grades { get; set; }
    }
}
