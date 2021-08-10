import React, { useEffect } from 'react';

import 'style/pages/Customers/List.scss';

import { DashboardContentTable, DashboardPageContent } from 'components';

import CustomersActionsBar from './CustomersActionsBar';
import CustomersViewsTabs from './CustomersViewsTabs';
import CustomersTable from './CustomersTable';
import CustomersAlerts from 'containers/Customers/CustomersAlerts';
import { CustomersListProvider } from './CustomersListProvider';

import withCustomers from './withCustomers';
import withCustomersActions from './withCustomersActions';

import { compose } from 'utils';

/**
 * Customers list.
 */
function CustomersList({
  // #withCustomers
  customersTableState,

  // #withCustomersActions
  setCustomersTableState
}) {
  // Resets the accounts table state once the page unmount.
  useEffect(
    () => () => {
      setCustomersTableState({
        filterRoles: [],
        viewSlug: '',
        pageIndex: 0,
      });
    },
    [setCustomersTableState],
  );

  return (
    <CustomersListProvider tableState={customersTableState}>
      <CustomersActionsBar />

      <DashboardPageContent>
        <CustomersViewsTabs />

        <DashboardContentTable>
          <CustomersTable />
        </DashboardContentTable>
      </DashboardPageContent>
      <CustomersAlerts />
    </CustomersListProvider>
  );
}

export default compose(
  withCustomers(({ customersTableState }) => ({ customersTableState })),
  withCustomersActions
)(CustomersList);
