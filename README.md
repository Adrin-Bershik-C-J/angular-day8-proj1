# Bug Tracker Application

A modern Angular-based bug tracking system with JWT authentication, role-based access control, and comprehensive CRUD operations.

## 🚀 Features

### Authentication & Authorization
- JWT-based authentication system
- Role-based access control (ADMIN role required)
- Secure route guards
- Token interceptor for API requests

### Bug Management
- Create, read, update, and delete bugs
- Filter bugs by status and priority
- View detailed bug information with comments
- Real-time form validation

### User Interface
- Modern, responsive design
- Clean and intuitive user experience
- Status and priority badges with color coding
- Mobile-friendly responsive layout

## 🛠️ Tech Stack

- **Frontend**: Angular 18+ (Standalone Components)
- **Styling**: Custom CSS with modern design patterns
- **HTTP Client**: Angular HttpClient with interceptors
- **Routing**: Angular Router with guards
- **Forms**: Template-driven forms with validation
- **Backend API**: REST API integration

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js (v18 or higher)
- npm or yarn package manager
- Angular CLI (`npm install -g @angular/cli`)
- Backend API running on `http://localhost:8080`

## 🚦 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/Adrin-Bershik-C-J/angular-day8-proj1.git
cd angular-day8-proj1
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
ng serve
```

The application will be available at `http://localhost:4200`

### 4. Build for Production
```bash
ng build --prod
```

## 🏗️ Project Structure

```
src/
├── app/
│   ├── bugs/                    # Bug management component
│   ├── login/                   # Authentication component
│   ├── services/               # Business logic services
│   │   ├── auth.service.ts     # Authentication service
│   │   └── bug.service.ts      # Bug management service
│   ├── guards/                 # Route protection
│   │   ├── auth.guard.ts       # Authentication guard
│   │   └── role.guard.ts       # Role-based guard
│   ├── interceptors/           # HTTP interceptors
│   └── pages/                  # Additional pages
├── styles.css                  # Global styles
└── main.ts                    # Application bootstrap
```

## 🔧 Configuration

### API Endpoints
The application connects to the following backend endpoints:

- **Authentication**: `POST /api/auth`
- **Bug Operations**:
  - Get bugs: `GET /api/bugs/search`
  - Create bug: `POST /api/bugs/admin/create`
  - Update bug: `PUT /api/bugs/admin/update/{id}`
  - Delete bug: `DELETE /api/bugs/admin/delete?id={id}`
  - Get bug details: `GET /api/bugs/{id}`
  - Add comment: `POST /api/bugs/{id}/comments`

### Environment Configuration
Update the API base URL in the services if needed:
```typescript
// In auth.service.ts and bug.service.ts
private apiUrl = 'http://localhost:8080/api';
```

## 🎯 Usage

### Login
1. Navigate to `/login`
2. Enter valid credentials
3. System will redirect to bugs dashboard upon successful authentication

### Bug Management
1. **Create Bug**: Fill out the form at the top of the bugs page
2. **Edit Bug**: Click "Edit" button on any bug row
3. **Delete Bug**: Click "Delete" button (with confirmation)
4. **Filter Bugs**: Use the filter dropdowns to narrow results
5. **View Details**: Click "View Details" to see bug information and comments

### Navigation
- `/login` - Authentication page
- `/bugs` - Main bug dashboard (requires ADMIN role)
- `/bug-detail/:id` - Detailed bug view with comments
- `/unauthorized` - Access denied page

## 🔒 Security Features

- **JWT Token Management**: Automatic token attachment to requests
- **Role-Based Access**: ADMIN role required for bug operations
- **Route Protection**: Guards prevent unauthorized access
- **Token Validation**: Automatic token parsing and validation

## 🎨 UI Components

### Status Badges
- **Open**: Blue badge
- **In Progress**: Orange badge  
- **Closed**: Green badge

### Priority Badges
- **High**: Red badge
- **Medium**: Orange badge
- **Low**: Green badge

## 🐛 Known Issues

1. Comments are currently stored locally and don't persist
2. User role extraction depends on JWT payload format
3. No real-time updates (requires manual refresh)

## 🔮 Future Enhancements

- [ ] Real-time notifications
- [ ] File attachment support
- [ ] Advanced search and filtering
- [ ] User management interface
- [ ] Dashboard analytics
- [ ] Email notifications
- [ ] Bulk operations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support and questions, please open an issue on the [GitHub repository](https://github.com/Adrin-Bershik-C-J/angular-day8-proj1/issues).

## 🙏 Acknowledgments

- Built with Angular and modern web development practices
- Inspired by modern bug tracking systems
- Designed for educational and professional use

---

**Made with ❤️ using Angular**
