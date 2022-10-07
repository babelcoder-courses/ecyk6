import {
  mockDeleteUser,
  mockGetAllUsers,
  mockGetUser,
  mockUpdateUser,
} from 'api/admin/users';
import { createUser, createUserList, Role, RoleValue, User } from 'models/user';
import { checkPermissions } from '../shared/permissions';
import { faker } from '@faker-js/faker';

const { _ } = Cypress;

const checkUserList = (users: User[]) => {
  cy.getByTestIDStartsWith('admin-user-item-at').each(($element, index) => {
    const { avatar, name, role } = users[index];

    cy.wrap($element).within(() => {
      cy.getByTestID('admin-user-avatar')
        .find('img')
        .should('have.attr', 'src', avatar);
      cy.getByTestID('admin-user-name').should('have.text', name);
      cy.getByTestID('admin-user-role').should(
        'have.text',
        _.invert(Role)[role as RoleValue],
      );
    });
  });
};

describe('Admin Users UI', () => {
  describe('Permissions', () => {
    checkPermissions(
      {
        Admin: true,
        Editor: false,
        Member: false,
      },
      '/admin/users',
    );
  });

  describe('Actions', () => {
    let usersPagination: ReturnType<typeof mockGetAllUsers>['response'];

    beforeEach(() => {
      usersPagination = mockGetAllUsers().response;

      cy.loginAs(Role.Admin);
      cy.visit('/admin/users');
    });

    it('renders all users correctly', () => {
      cy.getByTestID('admin-user-item-header').within(() => {
        cy.get('th').then((items) => {
          const [, avatar, name, role, actions] = items;

          expect(avatar).to.contain.text('Avatar');
          expect(name).to.contain.text('Name');
          expect(role).to.contain.text('Role');
          expect(actions).to.contain.text('Actions');
        });
      });

      checkUserList(usersPagination.users.items);
    });

    it('searchs some users correctly', () => {
      const term = faker.name.fullName();
      const expectedUserList = createUserList(undefined, {
        name: term,
      });

      mockGetAllUsers({ term }, undefined, expectedUserList).mocked.as(
        'loadUsersWithQuery',
      );
      cy.getByTestID('admin-user-search').type(term);
      cy.wait('@loadUsersWithQuery');
      checkUserList(expectedUserList);
    });

    it('renders a user correctly', () => {
      const selectedUser = faker.helpers.arrayElement(
        usersPagination.users.items,
      );
      const { id, avatar, email, name, role } = selectedUser;

      mockGetUser(id, selectedUser);
      cy.getByTestID(`admin-user-item-at-${id}`).within(() => {
        cy.getByTestID('admin-user-view').click();
      });
      cy.location('pathname').should('eq', `/admin/users/${id}`);
      cy.getByTestID('admin-user-avatar').should('have.attr', 'src', avatar);
      cy.getByTestID('admin-user-name').should('have.text', name);
      cy.getByTestID('admin-user-email').should('have.text', email);
      cy.getByTestID('admin-user-role').should(
        'have.text',
        _.invert(Role)[role as RoleValue],
      );
    });

    it('allows to edit the user correctly', () => {
      const selectedUser = faker.helpers.arrayElement(
        usersPagination.users.items,
      );
      const { id, avatar, email, name, role } = selectedUser;
      const updatedUser = createUser();

      mockGetUser(id, selectedUser);
      cy.getByTestID(`admin-user-item-at-${id}`).within(() => {
        cy.getByTestID('admin-user-edit').click();
      });
      cy.location('pathname').should('eq', `/admin/users/${id}/edit`);
      cy.getByTestID('preview-image').should('have.attr', 'src', avatar);
      cy.getByTestID('admin-user-name').within(() => {
        cy.get('input').should('have.value', name);
      });
      cy.getByTestID('admin-user-email').within(() => {
        cy.get('input').should('have.value', email);
      });
      cy.getByTestID('admin-user-role').should('have.value', role);
      cy.getByTestID('admin-user-submit').should('be.disabled');
      cy.getByTestID('upload-input').attachFile('users/avatar.png');
      cy.getByTestID('admin-user-name').within(() => {
        cy.get('input').clear().type(updatedUser.name);
      });
      cy.getByTestID('admin-user-email').within(() => {
        cy.get('input').clear().type(updatedUser.email);
      });
      cy.getByTestID('admin-user-role-selector').click();
      cy.getByTestID(`admin-user-role-${updatedUser.role}`).click();
      mockUpdateUser(id, updatedUser).mocked.as('updateUser');
      cy.getByTestID('admin-user-submit').should('be.visible').click();
      cy.wait('@updateUser').interceptFormData((formData) => {
        expect(formData.avatar).to.eq('avatar.png');
        expect(formData.email).to.eq(updatedUser.email);
        expect(formData.name).to.eq(updatedUser.name);
        expect(formData.role).to.eq(`${updatedUser.role}`);
      });
      cy.location('pathname').should('eq', `/admin/users/${id}`);
    });

    it('deletes the user correctly', () => {
      const { id } = faker.helpers.arrayElement(usersPagination.users.items);

      mockDeleteUser(id);
      cy.getByTestID(`admin-user-item-at-${id}`).within(() => {
        cy.getByTestID('admin-user-item-checkbox').check();
      });
      cy.getByTestID('admin-user-delete').click();
      cy.getByTestID('admin-user-delete-confirmation').click();
      cy.getByTestID(`admin-user-item-at-${id}`).should('not.exist');
    });
  });
});
