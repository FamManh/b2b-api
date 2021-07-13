import b2b from '../b2b';

// getEmployeeRole
const getEmployeeRole = async () => {
    const employeeRoleRes = await b2b.role.getEmployeeRole();
    console.log('employeeRole Res -> ', employeeRoleRes);
    console.log('-------------');
}
getEmployeeRole();

// // getRoleByRoleCode
const getRoleByRoleCode = async () => {
    const roleByRoleCode = await b2b.role.getRoleByRoleCode(144);
    console.log('roleByRoleCode Res -> ', roleByRoleCode);
    console.log('-------------');
}
getRoleByRoleCode();

// createRole
const createRole = async () => {
    const req = { role_name :"Role Name", role_description :"Role Description" }
    const createRoleRes = await b2b.role.createRole(req);
    console.log('createRole Res -> ', createRoleRes);
    console.log('-------------');
}
createRole();

// deleteRole
const deleteRole = async () => {
    const createRoleRes = await b2b.role.deleteRole(150);
    console.log('deleteRole Res -> ', createRoleRes);
    console.log('-------------');
}
deleteRole();

// enableRole
const enableRole = async () => {
    const res = await b2b.role.enableRole(152);
    console.log('enableRole Res -> ', res);
    console.log('-------------');
}
enableRole();

// deleteRole
const disableRole = async () => {
    const res = await b2b.role.disableRole(152);
    console.log('disableRole Res -> ', res);
    console.log('-------------');
}
disableRole();

const updateRole = async () => {
    const update = {
        "max_approval": 10,
        "role_name":"Role Name 1",
        "role_description": "Role Description 1",
        "max_discount_percent": 10,
        "permissions_code": [
           "approve_Quote",
           "delete_Quote",
           "edit_Quote",
           "re-assign_Quote",
           "view_Quote",
           "place_Order",
           "view_Order",
           "delete_Group",
           "view_Group",
           "delete_Category",
           "view_Category",
           "delete_User",
           "edit_User",
           "view_User",
           "edit_Account hierarchy",
           "view_Account hierarchy",
           "view_Price list",
           "delete_Product",
           "edit_Product",
           "view_Product"
        ],
        "role_code": 149,
        "enable": true
    }
    const updateRoleRes = await b2b.role.updateRole(update);
    console.log('updateRole Res -> ', updateRoleRes);
    console.log('-------------');
}
updateRole();



// deleteRole