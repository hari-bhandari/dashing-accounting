import React from 'react';
import { DashboardContentTable, DashboardPageContent } from 'components';

import 'style/pages/SaleReceipt/List.scss';

import ReceiptActionsBar from './ReceiptActionsBar';
import ReceiptViewTabs from './ReceiptViewTabs';
import ReceiptsAlerts from '../ReceiptsAlerts';
import ReceiptsTable from './ReceiptsTable';

import withReceipts from './withReceipts';
import withReceiptsActions from './withReceiptsActions';

import { ReceiptsListProvider } from './ReceiptsListProvider';
import { transformTableStateToQuery, compose } from 'utils';

/**
 * Receipts list page.
 */
function ReceiptsList({
  // #withReceipts
  receiptTableState,

  // #withReceiptsActions
  setReceiptsTableState,
}) {
  // Resets the receipts table state once the page unmount.
  React.useEffect(
    () => () => {
      setReceiptsTableState({
        filterRoles: [],
        viewSlug: '',
        pageIndex: 0,
      });
    },
    [setReceiptsTableState],
  );

  return (
    <ReceiptsListProvider query={transformTableStateToQuery(receiptTableState)}>
      <DashboardPageContent>
        <ReceiptActionsBar />

        <DashboardPageContent>
          <ReceiptViewTabs />

          <DashboardContentTable>
            <ReceiptsTable />
          </DashboardContentTable>
        </DashboardPageContent>

        <ReceiptsAlerts />
      </DashboardPageContent>
    </ReceiptsListProvider>
  );
}

export default compose(
  withReceipts(({ receiptTableState }) => ({
    receiptTableState,
  })),
  withReceiptsActions,
)(ReceiptsList);
