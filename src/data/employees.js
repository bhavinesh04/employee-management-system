const employees = [
  {
    "id": "emp001",
    "firstName": "Amit",
    "email": "amit@example.com",
    "password": "123",
    "tasks": [
      {
        "title": "Prepare financial report",
        "description": "Compile and format quarterly financial data.",
        "date": "2025-08-20",
        "category": "Finance",
        "active": true,
        "newTask": true,
        "completed": false,
        "failed": false
      },
      {
        "title": "Update client database",
        "description": "Ensure all client contact details are up to date.",
        "date": "2025-08-22",
        "category": "Data Entry",
        "active": true,
        "newTask": false,
        "completed": false,
        "failed": false
      },
      {
        "title": "Weekly team meeting",
        "description": "Present updates on ongoing projects.",
        "date": "2025-08-18",
        "category": "Meetings",
        "active": false,
        "newTask": false,
        "completed": true,
        "failed": false
      }
    ],
    "taskNumbers": {
      "active": 2,
      "newTask": 1,
      "completed": 1,
      "failed": 0
    }
  },
  {
    "id": "emp002",
    "firstName": "Priya",
    "email": "priya@example.com",
    "password": "123",
    "tasks": [
      {
        "title": "Design marketing flyer",
        "description": "Create a promotional flyer for the upcoming event.",
        "date": "2025-08-21",
        "category": "Marketing",
        "active": true,
        "newTask": true,
        "completed": false,
        "failed": false
      },
      {
        "title": "Inventory check",
        "description": "Review office supply stock levels.",
        "date": "2025-08-19",
        "category": "Operations",
        "active": false,
        "newTask": false,
        "completed": true,
        "failed": false
      },
      {
        "title": "Update website banner",
        "description": "Replace homepage banner with the seasonal promotion.",
        "date": "2025-08-17",
        "category": "Web Design",
        "active": false,
        "newTask": false,
        "completed": false,
        "failed": true
      }
    ],
    "taskNumbers": {
      "active": 1,
      "newTask": 1,
      "completed": 1,
      "failed": 1
    }
  },
  {
    "id": "emp003",
    "firstName": "Rohan",
    "email": "rohan@example.com",
    "password": "123",
    "tasks": [
      {
        "title": "Prepare sales presentation",
        "description": "Create slides for monthly sales meeting.",
        "date": "2025-08-23",
        "category": "Sales",
        "active": true,
        "newTask": true,
        "completed": false,
        "failed": false
      },
      {
        "title": "Follow up with leads",
        "description": "Email all leads from last week's conference.",
        "date": "2025-08-18",
        "category": "Sales",
        "active": true,
        "newTask": false,
        "completed": false,
        "failed": false
      },
      {
        "title": "Organize product photoshoot",
        "description": "Coordinate with the design team for photoshoot schedule.",
        "date": "2025-08-20",
        "category": "Marketing",
        "active": false,
        "newTask": false,
        "completed": false,
        "failed": true
      }
    ],
    "taskNumbers": {
      "active": 2,
      "newTask": 1,
      "completed": 0,
      "failed": 1
    }
  },
  {
    "id": "emp004",
    "firstName": "Neha",
    "email": "neha@example.com",
    "password": "123",
    "tasks": [
      {
        "title": "Create training material",
        "description": "Draft onboarding documents for new employees.",
        "date": "2025-08-25",
        "category": "HR",
        "active": true,
        "newTask": true,
        "completed": false,
        "failed": false
      },
      {
        "title": "Payroll processing",
        "description": "Finalize salary calculations for this month.",
        "date": "2025-08-20",
        "category": "Finance",
        "active": true,
        "newTask": false,
        "completed": false,
        "failed": false
      },
      {
        "title": "Staff feedback review",
        "description": "Analyze responses from employee satisfaction survey.",
        "date": "2025-08-18",
        "category": "HR",
        "active": false,
        "newTask": false,
        "completed": true,
        "failed": false
      }
    ],
    "taskNumbers": {
      "active": 2,
      "newTask": 1,
      "completed": 1,
      "failed": 0
    }
  },
  {
    "id": "emp005",
    "firstName": "Arjun",
    "email": "arjun@example.com",
    "password": "123",
    "tasks": [
      {
        "title": "Test new software feature",
        "description": "Run QA tests for the new dashboard analytics feature.",
        "date": "2025-08-19",
        "category": "IT",
        "active": true,
        "newTask": true,
        "completed": false,
        "failed": false
      },
      {
        "title": "Update user manuals",
        "description": "Edit user documentation to reflect the latest updates.",
        "date": "2025-08-21",
        "category": "IT",
        "active": false,
        "newTask": false,
        "completed": true,
        "failed": false
      },
      {
        "title": "Fix login issue",
        "description": "Resolve bug causing login errors for some users.",
        "date": "2025-08-18",
        "category": "IT",
        "active": false,
        "newTask": false,
        "completed": false,
        "failed": true
      }
    ],
    "taskNumbers": {
      "active": 1,
      "newTask": 1,
      "completed": 1,
      "failed": 1 
    }
  }
]

export default employees