namespace Application.Core.Enums
{
    public static class ApplicationStatusEnums
    {
        public const string Created = "C";
        public const string InProgress = "P";
        public const string Review = "R";
        public const string Cancel = "X";
        public const string Approved = "A";

        public static string GetName(string value)
        {
            return value switch
            {
                Created => "Created",
                InProgress => "In progress",
                Review => "Review",
                Cancel => "Cancel",
                Approved => "Approved",
                _ => "In progress",
            };
        }
    }
}