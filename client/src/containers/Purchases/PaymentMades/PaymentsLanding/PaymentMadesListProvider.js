import React, { createContext } from 'react';
import DashboardInsider from 'components/Dashboard/DashboardInsider';
import {
  useResourceViews,
  usePaymentMades,
  useResourceMeta
} from 'hooks/query';
import { isTableEmptyStatus, getFieldsFromResourceMeta } from 'utils';

const PaymentMadesListContext = createContext();

/**
 * Accounts chart data provider.
 */
function PaymentMadesListProvider({ query, ...props }) {
  // Fetch accounts resource views and fields.
  const {
    data: paymentMadesViews,
    isLoading: isViewsLoading,
  } = useResourceViews('bill_payments');

  // Fetch the accounts resource fields.
  const {
    data: resourceMeta,
    isLoading: isResourceMetaLoading,
    isFetching: isResourceMetaFetching,
  } = useResourceMeta('bill_payments');

  // Fetch accounts list according to the given custom view id.
  const {
    data: { paymentMades, pagination, filterMeta },
    isLoading: isPaymentsLoading,
    isFetching: isPaymentsFetching,
  } = usePaymentMades(query, { keepPreviousData: true });

  // Detarmines the datatable empty status.
  const isEmptyStatus =
    isTableEmptyStatus({
      data: paymentMades,
      pagination,
      filterMeta,
    }) && !isPaymentsLoading;

  // Provider payload.
  const provider = {
    paymentMades,
    pagination,
    filterMeta,
    paymentMadesViews,

    fields: getFieldsFromResourceMeta(resourceMeta.fields),
    resourceMeta,
    isResourceMetaLoading,
    isResourceMetaFetching,

    isPaymentsLoading,
    isPaymentsFetching,
    isViewsLoading,
    isEmptyStatus
  };

  return (
    <DashboardInsider
      loading={isViewsLoading || isResourceMetaLoading}
      name={'payment-mades-list'}
    >
      <PaymentMadesListContext.Provider value={provider} {...props} />
    </DashboardInsider>
  );
}

const usePaymentMadesListContext = () =>
  React.useContext(PaymentMadesListContext);

export { PaymentMadesListProvider, usePaymentMadesListContext };
