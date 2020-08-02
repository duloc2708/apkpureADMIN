import App from "app/App";
import Backend from "app/Backend";
const { Route, IndexRoute } = ReactRouter;
import UserFormSignIn from "modules/user/UserFormSignIn";
import AuthHoc from "common/hoc/Auth";
import HomeFormView from "modules/home/HomeFormView";
import ListFormView from "modules/list/ListFormView";
import ProductFormView from "modules/products/ProductFormView";
import StoneFormView from "modules/stone/StoneFormView";
import OrderFormView from "modules/order/OrderFormView";
import BagFormView from "modules/bag/BagFormView";
import BagDetailFormView from "modules/bagDetail/BagDetailFormView";
import OutputFormView from "modules/output/OutputFormView";
import ProductDetailFormView from "modules/products/ProductDetailFormView";
import GroupListFormView from "modules/grouplist/GroupListFormView";
import CastingFormView from "modules/casting/CastingFormView";
import CustomerFormView from "modules/customer/CustomerFormView";
import ReportFormView from "modules/report/ReportFormView";
import BaoGiaFormView from "modules/baogia/BaoGiaFormView";
import PermisionPageFormView from "modules/permision.page/PermisionPageFormView";
import ChangePasswordFormView from "modules/changepassword/ChangePasswordFormView";
import OrderFormViewEdit from "modules/order.edit/OrderFormViewEdit";
import CreateReportFormView from "modules/report.createReport/CreateReportFormView";
import OrderFormViewMold from "modules/order.mold/OrderFormViewEdit";
import listReportFormView from "modules/report.listreport/listReportFormView";
import TicketProcFormView from "modules/ticket_proc/TicketProcFormView";
import CashTransFormView from "modules/cd_cash_trans/CashTransFormView";
import CashTransGoldFormView from "modules/cd_cash_trans_gold/CashTransGoldFormView";

import GoldTransFormView from "modules/cd_gold_trans/GoldTransFormView";
import CdTurnInOutFormView from "modules/cd_turn_inout/CdTurnInOutFormView";
import RenderFormView from "modules/renderform/RenderFormView";
import TestFormView from "modules/atest/TestFormView";
import ListImageFormView from "modules/listimage/ListImageFormView";
import TransferFormView from "modules/transfer/TransferFormView";
import SearchFormView from "modules/ticket_proc_search/SearchFormView";

const routes = (
  <Route component={App}>
    <Route component={UserFormSignIn} path={Routes.login.view} />
    <Route component={AuthHoc(Backend)}>
      <Route
        component={CashTransGoldFormView}
        path={Routes.cdcashtransgold.view}
      ></Route>

      <Route component={ListImageFormView} path={Routes.listimage.view}></Route>
      <Route component={SearchFormView} path={Routes.searchBag.view}></Route>
      <Route component={TestFormView} path={Routes.testform.view}></Route>
      <Route component={RenderFormView} path={Routes.renderform.view}></Route>
      <Route component={CdTurnInOutFormView} path={Routes.cdturninout.view} />
      <Route component={CashTransFormView} path={Routes.cdcashtrans.view} />
      <Route component={GoldTransFormView} path={Routes.cdgoldtrans.view} />
      <Route component={TicketProcFormView} path={Routes.ticket_proc.view} />
      <Route component={listReportFormView} path={Routes.listReport.view} />
      <Route component={OrderFormViewEdit} path={Routes.orderedit.view} />
      <Route component={OrderFormViewMold} path={Routes.ordermold.view} />
      <Route
        component={ChangePasswordFormView}
        path={Routes.changepassword.view}
      />
      <Route
        component={PermisionPageFormView}
        path={Routes.permissonPage.view}
      />
      <Route component={BaoGiaFormView} path={Routes.baogia.view} />
      <Route component={HomeFormView} path={Routes.home.view} />
      <Route component={ListFormView} path={Routes.list.view} />
      <Route component={ProductFormView} path={Routes.products.view} />
      <Route component={StoneFormView} path={Routes.stone.view} />
      <Route component={OrderFormView} path={Routes.order.view} />
      <Route component={BagFormView} path={Routes.bag.view} />
      <Route component={BagDetailFormView} path={Routes.bagDetail.view} />
      <Route component={OutputFormView} path={Routes.output.view} />
      <Route
        component={ProductDetailFormView}
        path={Routes.productDetail.view}
      />
      <Route component={GroupListFormView} path={Routes.grouplist.view} />
      <Route component={CastingFormView} path={Routes.casting.view} />
      <Route component={CustomerFormView} path={Routes.customer.view} />
      <Route component={ReportFormView} path={Routes.report.view} />
      <Route component={CreateReportFormView} path={Routes.createReport.view} />
      <Route component={TransferFormView} path={Routes.transfer.view} />
    </Route>
  </Route>
);

module.exports = routes;
