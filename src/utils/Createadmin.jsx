export function createAdminAccount() {
    const savedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const adminEmail = "admin@bookmyseat.demo";
    const existingAdmin = savedUsers.find((user) => user.email === adminEmail);
    if (existingAdmin) {
        existingAdmin.role = "admin";
    } else {
        savedUsers.push({
            id: Date.now(),
            name: "Demo Admin",
            email: adminEmail,
            role: "admin",
        });
    }
    localStorage.setItem("users", JSON.stringify(savedUsers));
}
