var db = require("../../../common/mssql_db.js");
const jwt = require("../../../common/jwt.js");
var { KEY_TOKEN } = require("../../../common/constant");
var sql = require("mssql");
const Helpers = require("../../../common/helpers");
var { clientRedis } = require("../../../common/connect_redis.js");
let redisKeyBag = `ticket_proc_bag`;
let countKey = `prod_count_ticket_proc_bag`;
function accept_status(req, res, next) {
  let listParams = [
    { name: "CodeTicket", sqltype: sql.NVarChar, value: req.body.CodeTicket },
    { name: "StatusValue", sqltype: sql.NVarChar, value: req.body.StatusValue },
    { name: "User", sqltype: sql.NVarChar, value: req.headers["user_name"] }
  ];
  db.executeStoreProcedure(
    res,
    next,
    `Ticket_Proc_accept_status`,
    `Ticket_Proc_accept_status`,
    listParams
  );
}
function getAllList(req, res, next) {
  let { key, page, total, CodeProcess } = req.query;
  let listParams = [
    { name: "Page", sqltype: sql.Int, value: page },
    { name: "Total", sqltype: sql.Int, value: total },
    { name: "Key", sqltype: sql.NVarChar, value: key || "" },
    { name: "CodeProcess", sqltype: sql.NVarChar, value: CodeProcess || "" }
  ];
  db.executeStoreProcedure(
    res,
    next,
    `Ticket_Proc_getAllList`,
    `Ticket_Proc_getAllList`,
    listParams
  );
}
const parseDataToSql = (data, columns) => {
  let sql = "";
  data.forEach((item, i) => {
    let strRow = `(`;
    columns.forEach((col, icol) => {
      if (col) {
        Object.keys(item).forEach((key, ikey) => {
          const valueItem = item[key];
          if (col === key) {
            if (["", "null", null, undefined].indexOf(valueItem) !== -1) {
              strRow = strRow + null + `,`;
            } else {
              switch (typeof valueItem) {
                case "string":
                  strRow = strRow + `N'` + valueItem + `',`;
                  break;
                case "number":
                  strRow = strRow + valueItem + `,`;
                  break;
                case "boolean":
                  strRow = strRow + valueItem + `,`;
                  break;
                default:
                  strRow = strRow + null + `,`;
                  break;
              }
            }
          }
        });
      }
      if (icol == columns.length - 1) {
        strRow = strRow.substr(0, strRow.length - 1);
        strRow = strRow + `),`;
      }
    });
    sql = sql + strRow;
  });

  sql = sql.substring(0, sql.length - 1);
  return sql;
};
const genQueryListBag = (listBag, user_name) => {
  let sql = "";
  let query = "";
  let strBag = "";
  let columns = [
    "CodeProcess",
    "CodeTicket",
    "IdBag",
    "IdOrder",
    // "DateOrder",
    "ValueLV",
    "Notes",
    "Waxset_Weight",
    "Product_Weight_IN",
    "Broken_Weight_IN",
    "Gold_Weight_IN",
    "Product_Weight_OUT",
    "Broken_Weight_OUT",
    "Gold_Weight_OUT",
    "Gold_Lost",
    "Worker",
    "created_date",
    "created_by",
    "strWorkers",
    "strProducts",
    "statusBag",
    "sumQtyProduct",
    "sumQtyStoneWaxset",
    "IdGroup",
    "orderby",
    "IsDone",
    "Qty_Product_Remain",
    "Gold_Weight_Pay",
    "Qty_Product_Cancel"
  ];
  sql = parseDataToSql(listBag, columns);
  query =
    query + `INSERT INTO ticket_detail(${columns.toString()}) VALUES ${sql}; `;
  return { query, strBag };
};
const genQueryListStone = listStone => {
  let sqlStone = "";
  let query = "";
  let columns = [
    "INOUT",
    "IdTicket",
    "IdTicketDetail",
    "CodeProcess",
    "CodeTicket",
    "IdBag",
    "IdOrder",
    "IdProduct",
    "IdProductParent",
    "IdStone",
    "Color",
    "QtyProduct",
    "QtyStonePcs",
    "QtyStone",
    "AvgStone",
    "WeightPerQty",
    "BrokenQty",
    "BrokenWeight",
    "BrokenRate",
    "QtyAssignProduct",
    "IdGroup",
    "Worker",
    "orderby"
  ];
  sqlStone = parseDataToSql(listStone, columns);
  query =
    query +
    `INSERT INTO ticket_detail_d (${columns.toString()})  VALUES ${sqlStone}; `;
  return query;
};
const genQueryListGold = data => {
  let sql = "";
  let query = "";
  let columns = [
    "TF_Weight_Convert",
    "ValueLV_Convert",
    "created_date",
    "CodeTicket",
    "ValueLV",
    "TF_Weight_Default",
    "orderby"
  ];
  sql = parseDataToSql(data, columns);
  query =
    query +
    `INSERT INTO ticket_detail_gold (${columns.toString()})  VALUES ${sql}; `;
  return query;
};
function addNewItem(req, res, next) {
  let rdNum = Helpers.generateUUIDV4();
  let user_name = req.headers["user_name"];
  clientRedis.del(redisKeyBag);
  let { objData, listBag, listStone, ProcessPrev, listGoldSelected } = req.body;
  let {
    CodeProcess,
    CodeTicket,
    Name,
    ValueDate,
    CodeLV,
    ValueLV,
    Notes,
    Waxset_Weight_T,
    Product_Weight_IN_T,
    Broken_Weight_IN_T,
    Gold_Weight_IN_T,
    Product_Weight_OUT_T,
    Broken_Weight_OUT_T,
    Gold_Weight_OUT_T,
    Gold_Lost_T,
    Worker,
    created_by,
    SkeletonWeight,
    GoldWeight_Estimate,
    Gold_Weight2Store_T,
    Skeleton,
    Product_Skeleton_Weight
  } = objData;
  let strBag = "";
  let query = `
  BEGIN TRANSACTION;  
  INSERT INTO ticket_proc (
                                 CodeProcess
                                , CodeTicket
                                , Name
                                , ValueDate
                                , CodeLV
                                , ValueLV
                                , Notes
                                , Waxset_Weight_T
                                , Product_Weight_IN_T
                                , Broken_Weight_IN_T
                                , Gold_Weight_IN_T
                                , Product_Weight_OUT_T
                                , Broken_Weight_OUT_T
                                , Gold_Weight_OUT_T
                                , Gold_Lost_T
                                , SkeletonWeight
                                , GoldWeight_Estimate
                                , Gold_Weight2Store_T
                                , Worker
                                , created_by
                                , created_date
                                , Skeleton
                                , Product_Skeleton_Weight
                                ) 
                                values (
                                  '${CodeProcess}',
                                    '${CodeTicket}',
                                    N'${Name}',
                                    '${new Date(ValueDate).toISOString()}',
                                    '${CodeLV}',
                                    '${ValueLV}',
                                    '${Notes}',
                                    ${Waxset_Weight_T || null},
                                    ${Product_Weight_IN_T || null},
                                    ${Broken_Weight_IN_T || null},
                                    ${Gold_Weight_IN_T || null},
                                    ${Product_Weight_OUT_T || null},
                                    ${Broken_Weight_OUT_T || null},
                                    ${Gold_Weight_OUT_T || null},
                                    ${Gold_Lost_T || null},
                                    ${SkeletonWeight || null},
                                    ${GoldWeight_Estimate || null},
                                    ${Gold_Weight2Store_T || null},
                                    '${Worker}',
                                     N'${created_by || ""}',
                                     '${new Date().toISOString()}',
                                     ${(Skeleton && `N'${Skeleton}'`) || null},
                                      ${Product_Skeleton_Weight || null}
                                     ); `;
  if (listBag.length > 0) {
    const parseQuery = genQueryListBag(listBag, user_name);
    query = query + parseQuery.query;
    strBag = parseQuery.strBag;
  }
  if (listStone.length > 0) {
    query = query + genQueryListStone(listStone, user_name);
  }
  if (listGoldSelected.length > 0) {
    query = query + genQueryListGold(listGoldSelected, user_name);
  }

  strBag = strBag.substr(0, strBag.length - 1);
  if (strBag) {
    // cập nhật trạng thái bag đang ở proccess mới nhất
    query =
      query +
      `
    UPDATE BAG
    set ProcessTicket = '${CodeProcess}'
    where Id IN (${strBag})
    ;`;

    // cập nhật trạng thái bag đang ở proccess mới nhất

    query =
      query +
      `
    UPDATE ticket_detail 
    set IsDone = 1
    where IdBag IN (${strBag}) and CodeProcess = '${ProcessPrev}'
    ;`;
  }

  query = query + "COMMIT;";
  db.executeQueryAll(res, next, "stone.addNewItem", query);
}
function updateItem(req, res, next) {
  let rdNum = Helpers.generateUUIDV4();
  let user_name = req.headers["user_name"];
  clientRedis.del(redisKeyBag);
  let { objData, listBag, listStone, listGoldSelected } = req.body;
  let {
    orderby,
    IdTicket,
    CodeProcess,
    CodeTicket,
    Name,
    ValueDate,
    CodeLV,
    ValueLV,
    Notes,
    Waxset_Weight_T,
    Product_Weight_IN_T,
    Broken_Weight_IN_T,
    Gold_Weight_IN_T,
    Product_Weight_OUT_T,
    Broken_Weight_OUT_T,
    Gold_Weight_OUT_T,
    Gold_Lost_T,
    Worker,
    created_by,
    SkeletonWeight,
    GoldWeight_Estimate,
    Gold_Weight2Store_T,
    Skeleton,
    Product_Skeleton_Weight
  } = objData;
  let query = `
    BEGIN TRANSACTION;  
    DELETE FROM ticket_detail where CodeTicket= '${CodeTicket}' ;
    DELETE FROM ticket_detail_d where CodeTicket= '${CodeTicket}' ;
    DELETE FROM ticket_detail_gold where CodeTicket= '${CodeTicket}' ;

    UPDATE [ticket_proc]
    set
     Name=N'${Name}'
    , ValueDate='${new Date(ValueDate).toISOString()}'
    , CodeLV='${CodeLV}'
    , ValueLV='${ValueLV}'
    , Notes='${Notes}'
    , Waxset_Weight_T=${Waxset_Weight_T || null}
    , Product_Weight_IN_T=${Product_Weight_IN_T || null}
    , Broken_Weight_IN_T=${Broken_Weight_IN_T || null}
    , Gold_Weight_IN_T=${Gold_Weight_IN_T || null}
    , Product_Weight_OUT_T=${Product_Weight_OUT_T || null}
    , Broken_Weight_OUT_T=${Broken_Weight_OUT_T || null}
    , Gold_Weight_OUT_T=${Gold_Weight_OUT_T || null}
    , Gold_Lost_T=${Gold_Lost_T || null}
    , SkeletonWeight=${SkeletonWeight || null}
    , GoldWeight_Estimate=${GoldWeight_Estimate || null}
    , Gold_Weight2Store_T=${Gold_Weight2Store_T || null}
    , Worker='${Worker}'
    , update_by='${created_by}'
    , update_date='${new Date().toISOString()}'
     , Skeleton=${(Skeleton && `N'${Skeleton}'`) || null}
     , Product_Skeleton_Weight=${Product_Skeleton_Weight || null}
    where CodeTicket = '${CodeTicket}'`;
  if (listBag.length > 0) {
    const parseQuery = genQueryListBag(listBag, user_name);
    query = query + parseQuery.query;
  }
  if (listStone.length > 0) {
    query = query + genQueryListStone(listStone, user_name);
    console.log('genQueryListStone',genQueryListStone(listStone, user_name));
  }
  if (listGoldSelected.length > 0) {
    query = query + genQueryListGold(listGoldSelected, user_name);
  }
  query = query + "COMMIT;";
  db.executeQueryAll(res, next, "stone.addNewItem", query);
}
function deleteItem(req, res, next) {
  let { id } = req.body;
  let listParams = [{ name: "IdStone", sqltype: sql.VarChar, value: id }];
  db.executeStoreProcedure(
    res,
    next,
    `Stone_deleteItem`,
    `Stone_deleteItem`,
    listParams
  );
}
function deleteAll(req, res, next) {
  let { listid } = req.body;
  let query = "DELETE FROM STONE WHERE Id IN ( " + listid.toString() + ")";
  query = query.split(".").join("'");
  db.executeQueryAll(res, next, "stone.deleteAll", query);
}
function getAllListStoneBySearch(req, res, next) {
  let { page, total, key, value } = req.query;
  let listParams = [
    { name: "Page", sqltype: sql.Int, value: page },
    { name: "Total", sqltype: sql.Int, value: total },
    { name: "Key", sqltype: sql.NVarChar, value: key },
    { name: "Value", sqltype: sql.NVarChar, value: value }
  ];
  db.executeStoreProcedure(
    res,
    next,
    `Stone_getAllListStoneBySearch`,
    `Stone_getAllListStoneBySearch`,
    listParams
  );
}

function get_all_bag_ticket(req, res, next) {
  let listParams = [];
  db.executeStoreProcedure(
    res,
    next,
    `Ticket_Proc_getAllBagTicket`,
    `Ticket_Proc_getAllBagTicket`,
    listParams
  );
}
function find_bag_default(req, res, next) {
  let { IdBag, CodeProcess } = req.query;
  let listParams = [
    { name: "IdBag", sqltype: sql.NVarChar, value: IdBag },
    { name: "CodeProcess", sqltype: sql.NVarChar, value: CodeProcess }
  ];

  db.executeStoreProcedure(
    res,
    next,
    `Ticket_Proc_getAllBag`,
    `Ticket_Proc_getAllBag`,
    listParams
  );
}
function get_all_bag(req, res, next) {
  let listParams = [];
  db.executeStoreProcedure(
    res,
    next,
    `Ticket_Proc_getAllBag`,
    `Ticket_Proc_getAllBag`,
    listParams
  );
}
// function get_all_bag(req, res, next) {
//   let listParams = [];
//   //set keyRedis
//   clientRedis.incr(countKey, (err, count) => {
//     clientRedis.hgetall(redisKeyBag, function(err, resdata) {
//       if (resdata) {
//         let result = resdata.dataCache;
//         return res.status(200).send(result);
//       }
//       db.executeStoreGetData(
//         res,
//         next,
//         `Ticket_Proc_getAllBag`,
//         `Ticket_Proc_getAllBag`,
//         listParams
//       ).then(result => {
//         clientRedis.hmset(
//           redisKeyBag,
//           { dataCache: JSON.stringify(result) },
//           function(err, result) {
//             if (err) console.log(err);
//           }
//         );
//         clientRedis.expire(redisKeyBag, 3600);
//         return res.status(200).send(JSON.stringify(result));
//       });
//     });
//   });
// }
function getAutoNumber(req, res, next) {
  let { code } = req.query;
  let listParams = [{ name: "code", sqltype: sql.NVarChar, value: code }];
  db.executeStoreProcedure(
    res,
    next,
    `GenerateNumberTicketProc`,
    `GenerateNumberTicketProc`,
    listParams
  );
}
function get_list_stone_waxset_bag(req, res, next) {
  let { IdBag } = req.query;
  let listParams = [{ name: "IdBag", sqltype: sql.NVarChar, value: IdBag }];
  db.executeStoreProcedure(
    res,
    next,
    `Ticket_Proc_getListStoneWaxset`,
    `Ticket_Proc_getListStoneWaxset`,
    listParams
  );
}
function insert_list_stone_waxset(req, res, next) {
  let { IdBag } = req.query;
  let listParams = [{ name: "IdBag", sqltype: sql.NVarChar, value: IdBag }];
  db.executeStoreProcedure(
    res,
    next,
    `Casting_Proc_getListStoneWaxset`,
    `Casting_Proc_getListStoneWaxset`,
    listParams
  );
}
function get_ticket_detail(req, res, next) {
  let { CodeTicket } = req.query;
  let listParams = [
    { name: "CodeTicket", sqltype: sql.NVarChar, value: CodeTicket }
  ];
  db.executeStoreProcedure(
    res,
    next,
    `Ticket_Proc_getListTicketDetail`,
    `Ticket_Proc_getListTicketDetail`,
    listParams
  );
}
function get_ticket_detail_stone(req, res, next) {
  let { CodeTicket } = req.query;
  let listParams = [
    { name: "CodeTicket", sqltype: sql.NVarChar, value: CodeTicket }
  ];
  db.executeStoreProcedure(
    res,
    next,
    `Ticket_Proc_getListTicketDetailStone`,
    `Ticket_Proc_getListTicketDetailStone`,
    listParams
  );
}
function find_bag_process(req, res, next) {
  let { page, total, key } = req.query;
  let listParams = [
    { name: "Page", sqltype: sql.Int, value: page },
    { name: "Total", sqltype: sql.Int, value: total },
    { name: "Key", sqltype: sql.NVarChar, value: key }
  ];
  db.executeStoreProcedure(
    res,
    next,
    `Ticket_Proc_FindBagTicket`,
    `Ticket_Proc_FindBagTicket`,
    listParams
  );
}
function get_ticket_skeleton(req, res, next) {
  let { page, total, key } = req.query;
  let listParams = [];
  db.executeStoreProcedure(
    res,
    next,
    `Ticket_Proc_FindTicketSkeleton`,
    `Ticket_Proc_FindTicketSkeleton`,
    listParams
  );
}
function get_all_gold(req, res, next) {
  let { page, total, key } = req.query;
  let listParams = [];
  db.executeStoreProcedure(
    res,
    next,
    `Ticket_Proc_getAllGold`,
    `Ticket_Proc_getAllGold`,
    listParams
  );
}
function get_all_gold_by_ticket(req, res, next) {
  let { CodeTicket, Status } = req.query;
  let listParams = [
    { name: "CodeTicket", sqltype: sql.NVarChar, value: CodeTicket },
    { name: "Status", sqltype: sql.NVarChar, value: Status || "" }
  ];
  console.log('listParams',listParams);
  db.executeStoreProcedure(
    res,
    next,
    `Ticket_Proc_getListGoldByTicket`,
    `Ticket_Proc_getListGoldByTicket`,
    listParams
  );
}
function validate_ticket(req, res, next) {
  let { CodeTicket, StatusValue } = req.body;
  let query =`select dbo.TF_ValidateTicket('${CodeTicket}',null,'${StatusValue}') as 'OUTPUT'`
  db.executeQueryAll(res, next, "stone.addNewItem", query);
}
module.exports = {
  validate_ticket,
  get_all_gold_by_ticket,
  get_all_gold,
  get_ticket_skeleton,
  find_bag_default,
  find_bag_process,
  get_all_bag_ticket,
  accept_status,
  get_ticket_detail_stone: get_ticket_detail_stone,
  get_ticket_detail: get_ticket_detail,
  insert_list_stone_waxset: insert_list_stone_waxset,
  get_list_stone_waxset_bag: get_list_stone_waxset_bag,
  getAutoNumber: getAutoNumber,
  get_all_bag: get_all_bag,
  getAllList: getAllList,
  addNewItem: addNewItem,
  updateItem: updateItem,
  deleteItem: deleteItem,
  deleteAll: deleteAll
};
