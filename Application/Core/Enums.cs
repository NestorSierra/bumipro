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

    public static class PropertyCategoriesEnums
    {
        public const string House = "house";
        public const string Apartment = "apartment";
        public const string Room = "room";
        public const string CarParkging = "carparking";
        public const string Warehouse = "warehouse";

        public static string GetName(string value)
        {
            return value switch
            {
                House => "House",
                Apartment => "Apartment",
                Room => "Room",
                CarParkging => "Car Parking",
                Warehouse => "Warehouse",
                _ => "House",
            };
        }

    }
}