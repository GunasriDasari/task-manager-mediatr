using System.ComponentModel.DataAnnotations;

namespace TaskManager.Models.Models
{
    public class TaskItem
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Title { get; set; }

        [Required]
        [StringLength(250)]
        public string Description { get; set; }

        public bool IsCompleted { get; set; }

    }
}

