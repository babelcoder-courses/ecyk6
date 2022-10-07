import { Role } from 'models/user';

type Permissions = {
  [K in keyof typeof Role]: boolean;
};

export const checkPermissions = (permissions: Permissions, path: string) => {
  for (const [roleName, isAllowed] of Object.entries(permissions)) {
    const action = isAllowed ? 'allows' : 'does not allow';

    it(`${action} ${roleName} to access ${path} correctly`, () => {
      const role = Role[roleName as keyof Permissions];

      cy.loginAs(role);
      cy.visit(path);

      if (isAllowed) {
        cy.getByTestID('flash-message').should('not.exist');
      } else {
        cy.getByTestID('flash-message').should(
          'have.text',
          'You are not allowed to access this page',
        );
      }
    });
  }
};
