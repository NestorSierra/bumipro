# Bumipro

## Overview

**Bumipro** is a web application built using **C# .NET Core 6** and **React**. The application leverages modern frameworks such as **Material-UI (MUI)** for styling and **MobX** for state management, ensuring a responsive and seamless user experience. It connects tenants and renters, making it easy to find or list properties and rooms for rent.

---

## Features

### For Tenants:
- **Sign-Up and Profile Creation**: Tenants can create personal profiles, including:
  - Personal information
  - Previous rental experience and preferences
- **Property Search**: View available rooms or apartments listed by renters.
- **Informed Decision-Making**: Browse detailed property listings, including pictures and descriptions.

### For Renters:
- **Sign-Up and Listings**: Renters can:
  - Register and create an account.
  - Add properties or rooms available for rent.
  - Upload images to showcase the properties.
- **Tenant Interaction**: Provide tenants with all the information needed to select the best option.

---

## Technologies Used
- **Frontend**: React
  - **Frameworks**: Material-UI (MUI)
  - **State Management**: MobX
- **Backend**: C# .NET Core 6
- **Database**: SQL Server (or specify the database if different)
- **APIs**: RESTful services built with .NET Core

---

## Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **.NET Core 6 SDK**
- A compatible database system (e.g., SQL Server)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/NestorSierra/bumipro.git
   cd bumipro

2. Set up the backend:
   ```bash
   cd API
   dotnet restore
   dotnet run watch

3. Set up the frontend:
  ```bash
  cd client-app
  npm install  

4. Access the application:
  ```bash
  http://localhost:3000
  ```

---

## Future Enhancements

- [ ] Add a messaging system for tenants and renters to communicate directly.
- [ ] Implement property reviews and ratings for enhanced decision-making.
- [ ] Add filters for tenants to search properties by:
  - Price
  - Location
  - Type (Room/Apartment)
- [ ] Enable real-time notifications for renters and tenants.
- [ ] Optimize image uploads for faster property listing updates.

---

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any questions, feedback, or collaboration opportunities, feel free to reach out:

- **Email**: [nestor.sierra.93@gmail.com](mailto:nestor.sierra.93@gmail.com)
- **GitHub**: [Néstor Sierra](https://github.com/NestorSierra?tab=repositories)

I am look forward to hearing from you!



