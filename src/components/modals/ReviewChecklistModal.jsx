// // // import React, { useState, useEffect } from "react";
// // // import {
// // //   Button,
// // //   Table,
// // //   Tag,
// // //   Modal,
// // //   Input,
// // //   Select,
// // //   Card,
// // //   Descriptions,
// // //   message,
// // //   Upload,
// // //   // 🟢 ADDED: Missing Ant Design components for CommentTrail
// // //   Spin,
// // //   List,
// // //   Avatar,
// // // } from "antd";
// // // import {
// // //   UploadOutlined,
// // //   EyeOutlined,
// // //   // 🟢 ADDED: Missing Ant Design icon for CommentTrail
// // //   UserOutlined,
// // // } from "@ant-design/icons";

// // // import DocumentInputSection from "../../components/creator/DocumentInputSection";
// // // import {
// // //   useSubmitChecklistToRMMutation,
// // //   useUpdateChecklistStatusMutation,
// // //   useGetChecklistCommentsQuery,
// // // } from "../../api/checklistApi";

// // // const { Option } = Select;

// // // // Theme Colors
// // // const PRIMARY_BLUE = "#164679";
// // // const ACCENT_LIME = "#b5d334";
// // // const SECONDARY_PURPLE = "#7e6496";

// // // // Custom CSS
// // // const customStyles = `
// // //   .ant-modal-header { background-color: ${PRIMARY_BLUE} !important; padding: 18px 24px !important; }
// // //   .ant-modal-title { color: white !important; font-size: 1.15rem !important; font-weight: 700 !important; letter-spacing: 0.5px; }
// // //   .ant-modal-close-x { color: white !important; }

// // //   .checklist-info-card .ant-card-head { border-bottom: 2px solid ${ACCENT_LIME} !important; }
// // //   .checklist-info-card .ant-descriptions-item-label { font-weight: 600 !important; color: ${SECONDARY_PURPLE} !important; padding-bottom: 4px; }
// // //   .checklist-info-card .ant-descriptions-item-content { color: ${PRIMARY_BLUE} !important; font-weight: 700 !important; font-size: 13px !important; }

// // //   .doc-table.ant-table-wrapper table { border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; }
// // //   .doc-table .ant-table-thead > tr > th { background-color: #f7f9fc !important; color: ${PRIMARY_BLUE} !important; font-weight: 600 !important; padding: 12px 16px !important; }
// // //   .doc-table .ant-table-tbody > tr > td { padding: 10px 16px !important; border-bottom: 1px dashed #f0f0f0 !important; }

// // //   .ant-input, .ant-select-selector { border-radius: 6px !important; border-color: #e0e0e0 !important; }
// // //   .ant-input:focus, .ant-select-focused .ant-select-selector { box-shadow: 0 0 0 2px rgba(22, 70, 121, 0.2) !important; border-color: ${PRIMARY_BLUE} !important; }

// // //   .status-tag { font-weight: 700 !important; border-radius: 999px !important; padding: 3px 8px !important; text-transform: capitalize; min-width: 80px; text-align: center; display: inline-flex; align-items: center; gap: 4px; justify-content: center; }

// // //   .ant-modal-footer .ant-btn { border-radius: 8px; font-weight: 600; height: 38px; padding: 0 16px; }
// // //   .ant-modal-footer .ant-btn-primary { background-color: ${PRIMARY_BLUE} !important; border-color: ${PRIMARY_BLUE} !important; }
// // // `;

// // // // 🟢 ADDED: Helper function to render role tags in the Comment Trail
// // // const getRoleTag = (role) => {
// // //   let color = "blue";
// // //   const roleLower = role.toLowerCase();
// // //   switch (roleLower) {
// // //     case "rm":
// // //       color = "purple";
// // //       break;
// // //     case "creator":
// // //       color = "green";
// // //       break;
// // //     case "co_checker":
// // //       color = "volcano";
// // //       break;
// // //     case "system":
// // //       color = "default";
// // //       break;
// // //     default:
// // //       color = "blue";
// // //   }
// // //   return (
// // //     <Tag color={color} style={{ marginLeft: 8, textTransform: "uppercase" }}>
// // //       {roleLower.replace(/_/g, " ")}
// // //     </Tag>
// // //   );
// // // };

// // // const CommentTrail = ({ comments, isLoading }) => {
// // //   if (isLoading) {
// // //     return (
// // //       <div style={{ textAlign: "center", padding: 20 }}>
// // //         <Spin />
// // //       </div>
// // //     );
// // //   }
// // //   if (!comments || comments.length === 0) {
// // //     return (
// // //       <div style={{ paddingLeft: 15, borderLeft: `3px solid ${PRIMARY_BLUE}` }}>
// // //         <i>No historical comments yet.</i>
// // //       </div>
// // //     );
// // //   }
// // //   return (
// // //     <div
// // //       style={{
// // //         overflowX: "auto",
// // //         whiteSpace: "nowrap",
// // //         paddingBottom: 8,
// // //       }}
// // //     >
// // //       <div style={{ display: "inline-flex", gap: 16 }}>
// // //         {comments.map((item, index) => (
// // //           <Card
// // //             key={index}
// // //             style={{
// // //               minWidth: 420,
// // //               maxWidth: 420,
// // //               borderLeft: `4px solid ${PRIMARY_BLUE}`,
// // //             }}
// // //           >
// // //             <List.Item.Meta
// // //               avatar={<Avatar icon={<UserOutlined />} />}
// // //               title={
// // //                 <div
// // //                   style={{ display: "flex", justifyContent: "space-between" }}
// // //                 >
// // //                   <div>
// // //                     <b>{item.userId?.name || "System"}</b>{" "}
// // //                     {getRoleTag(item.userId?.role || "system")}
// // //                   </div>
// // //                   <span style={{ fontSize: 12, color: "#888" }}>
// // //                     {new Date(
// // //                       item.createdAt || item.timestamp
// // //                     ).toLocaleString()}
// // //                   </span>
// // //                 </div>
// // //               }
// // //               description={
// // //                 <div
// // //                   style={{
// // //                     whiteSpace: "normal",
// // //                     wordBreak: "break-word",
// // //                     marginTop: 8,
// // //                   }}
// // //                 >
// // //                   {item.message}
// // //                 </div>
// // //               }
// // //             />
// // //           </Card>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // const ReviewChecklistModal = ({ checklist, open, onClose }) => {
// // //   const [docs, setDocs] = useState([]);
// // //   const [newDocName, setNewDocName] = useState("");
// // //   const [selectedCategoryName, setSelectedCategoryName] = useState(null);
// // //   const [showCheckerSubmission, setShowCheckerSubmission] = useState(false);
// // //   const [creatorComment, setCreatorComment] = useState("");
// // //   const [checkerComment, setCheckerComment] = useState("");
// // //   const [checkerFiles, setCheckerFiles] = useState([]);

// // //   const [submitRmChecklist, { isLoading }] = useSubmitChecklistToRMMutation();
// // //   const [updateChecklistStatus, { isLoading: isCheckerSubmitting }] =
// // //     useUpdateChecklistStatusMutation();
// // //   // import rtk
// // //   const { data: comments, isLoading: commentsLoading } =
// // //     useGetChecklistCommentsQuery(checklist?._id, { skip: !checklist?._id });

// // //   /** ========================
// // //    * LOAD DOCUMENTS CORRECTLY
// // //    * ======================== */
// // //   useEffect(() => {
// // //     // 1. Guard clause to ensure checklist and documents exist
// // //     if (!checklist || !checklist.documents) return;

// // //     const flatDocs = checklist.documents.reduce((acc, item) => {
// // //       // Check 1: If item has a docList AND that list has documents, flatten them.
// // //       if (
// // //         item.docList &&
// // //         Array.isArray(item.docList) &&
// // //         item.docList.length > 0
// // //       ) {
// // //         const nestedDocs = item.docList.map((doc) => ({
// // //           ...doc,
// // //           // Inherit category from the parent item
// // //           category: item.category,
// // //         }));
// // //         return acc.concat(nestedDocs);
// // //       }

// // //       // Check 2 (The Fix): If docList is empty (or non-existent), include the
// // //       // top-level item itself, provided it has a category.
// // //       // This ensures your 12 items are not ignored.
// // //       if (item.category) {
// // //         // We're including the top-level object as a document
// // //         return acc.concat(item);
// // //       }

// // //       // Default: Skip anything that doesn't fit the document structure
// // //       return acc;
// // //     }, []); // Initialize the accumulator as an empty array

// // //     // 2. Prepare/standardize the flattened documents
// // //     const preparedDocs = flatDocs.map((doc, idx) => ({
// // //       ...doc,
// // //       // Assign a local index for mapping/keying
// // //       docIdx: idx,
// // //       // Standardize fields that might be missing
// // //       status: doc.status || "pendingrm",
// // //       action: doc.status || "pendingrm",
// // //       comment: doc.comment || "",
// // //       fileUrl: doc.fileUrl || null,
// // //     }));

// // //     // 3. Update the state and log
// // //     setDocs(preparedDocs);
// // //     // Log the preparedDocs, as that's what's actually being set to state
// // //     console.log("preparedDocs", checklist);
// // //   }, [checklist]);

// // //   /** ========================
// // //    * DOCUMENT MANAGEMENT
// // //    * ======================== */
// // //   const handleAddNewDocument = () => {
// // //     if (!newDocName.trim() || !selectedCategoryName) {
// // //       return message.error(
// // //         "Please enter a document name and select a category."
// // //       );
// // //     }

// // //     setDocs((prevDocs) => [
// // //       ...prevDocs,
// // //       {
// // //         docIdx: prevDocs.length,
// // //         name: newDocName.trim(),
// // //         category: selectedCategoryName,
// // //         status: "pendingrm",
// // //         action: "pendingrm",
// // //         comment: "",
// // //         fileUrl: null,
// // //       },
// // //     ]);

// // //     message.success(
// // //       `Document '${newDocName.trim()}' added to ${selectedCategoryName}.`
// // //     );
// // //     setNewDocName("");
// // //     setSelectedCategoryName(null);
// // //   };

// // //   const handleActionChange = (idx, value) => {
// // //     const updated = [...docs];
// // //     updated[idx].action = value;
// // //     updated[idx].status = value;
// // //     setDocs(updated);
// // //   };

// // //   const handleCommentChange = (idx, value) => {
// // //     const updated = [...docs];
// // //     updated[idx].comment = value;
// // //     setDocs(updated);
// // //   };

// // //   const handleDelete = (idx) => {
// // //     const updated = docs
// // //       .filter((_, i) => i !== idx)
// // //       .map((doc, i) => ({
// // //         ...doc,
// // //         docIdx: i,
// // //       }));
// // //     setDocs(updated);
// // //     message.success("Document deleted.");
// // //   };

// // //   const handleFileUpload = (docIdx, file) => {
// // //     const updated = [...docs];
// // //     // NOTE: In a real app, this should be a secure URL from a file upload service (e.g., S3)
// // //     updated[docIdx].fileUrl = URL.createObjectURL(file);
// // //     updated[docIdx].status = "uploaded";
// // //     setDocs(updated);
// // //     message.success("File uploaded");
// // //     return false;
// // //   };

// // //   /** ========================
// // //    * SUBMIT TO RM
// // //    * ======================== */
// // //   const submitToRM = async () => {
// // //     try {
// // //       if (!checklist?._id) throw new Error("Checklist ID missing");

// // //       // 1. Re-group the flat 'docs' array into the nested structure
// // //       const nestedDocuments = docs.reduce((acc, doc) => {
// // //         // Find an existing category group
// // //         let categoryGroup = acc.find((c) => c.category === doc.category);

// // //         // If the category group doesn't exist, create it and add it to the accumulator
// // //         if (!categoryGroup) {
// // //           categoryGroup = { category: doc.category, docList: [] };
// // //           acc.push(categoryGroup);
// // //         }

// // //         // 2. Map the document fields needed for the docUpdate
// // //         // NOTE: We only push necessary fields (especially _id for Mongoose update)
// // //         categoryGroup.docList.push({
// // //           _id: doc._id,
// // //           name: doc.name,
// // //           category: doc.category,
// // //           status: doc.status,
// // //           action: doc.action, // Include action update
// // //           comment: doc.comment,
// // //           fileUrl: doc.fileUrl || null,
// // //           // Include deferralReason if it's a field you are tracking
// // //           deferralReason: doc.deferralReason,
// // //         });

// // //         return acc;
// // //       }, []); // Initialize accumulator as an empty array

// // //       // 3. Construct the payload with the re-nested documents
// // //       const payload = {
// // //         creatorComment,
// // //         documents: nestedDocuments, // ⭐ THIS IS THE NESTED ARRAY
// // //       };

// // //       await submitRmChecklist({ id: checklist._id, body: payload }).unwrap();
// // //       message.success("Checklist submitted to RM!");
// // //       onClose();
// // //     } catch (err) {
// // //       console.error(err);
// // //       message.error(err?.data?.error || "Failed to submit checklist to RM");
// // //     }
// // //   };

// // //   /** ========================
// // //    * SUBMIT TO CHECKER
// // //    * ======================== */
// // //   const submitToCheckers = async () => {
// // //     if (!checklist?.dclNo) return message.error("DCL No missing.");

// // //     try {
// // //       message.loading({
// // //         content: "Submitting checklist to Co-Checker...",
// // //         key: "checkerSubmit",
// // //       });

// // //       // NOTE: The backend needs to know how to handle the 'docs' array in this payload
// // //       const payload = {
// // //         dclNo: checklist.dclNo,
// // //         documents: docs,
// // //         status: "co_checker_review",
// // //         submittedToCoChecker: true,
// // //         finalComment: checkerComment,
// // //         attachments: checkerFiles,
// // //       };

// // //       await updateChecklistStatus(payload).unwrap();

// // //       message.success({
// // //         content: "Checklist submitted to Co-Checker!",
// // //         key: "checkerSubmit",
// // //         duration: 3,
// // //       });
// // //       onClose();
// // //     } catch (err) {
// // //       console.error(err);
// // //       message.error({
// // //         content: err?.data?.error || "Failed to submit checklist.",
// // //         key: "checkerSubmit",
// // //       });
// // //     }
// // //   };

// // //   const uniqueCategories = [...new Set(docs.map((doc) => doc.category))];
// // //   // NOTE: Assuming 'submitted' is the state that means 'approved/complete'
// // //   const allDocsApproved =
// // //     docs.length > 0 && docs.every((doc) => doc.action === "submitted");

// // //   const renderStatusTag = (status) => (
// // //     <Tag className="status-tag">{status.replace(/_/g, " ")}</Tag>
// // //   );

// // //   const columns = [
// // //     {
// // //       title: "Category",
// // //       dataIndex: "category",
// // //       width: 120,
// // //       render: (text) => (
// // //         <span
// // //           style={{ fontSize: 12, color: SECONDARY_PURPLE, fontWeight: 500 }}
// // //         >
// // //           {text}
// // //         </span>
// // //       ),
// // //     },
// // //     {
// // //       title: "Document Name",
// // //       dataIndex: "name",
// // //       width: 250,
// // //       render: (text, record) => (
// // //         <Input
// // //           size="small"
// // //           value={record.name}
// // //           onChange={(e) => {
// // //             const updated = [...docs];
// // //             updated[record.docIdx].name = e.target.value;
// // //             setDocs(updated);
// // //           }}
// // //         />
// // //       ),
// // //     },
// // //     {
// // //       title: "Action",
// // //       dataIndex: "action",
// // //       width: 140,
// // //       render: (text, record) => (
// // //         <Select
// // //           size="small"
// // //           value={record.action}
// // //           style={{ width: "100%" }}
// // //           onChange={(val) => handleActionChange(record.docIdx, val)}
// // //         >
// // //           <Option value="submitted">Submitted</Option>
// // //           <Option value="pendingrm">Pending from RM</Option>
// // //           <Option value="pending_from_co">Pending from Co</Option>
// // //           <Option value="tbo">TBO</Option>
// // //           <Option value="sighted">Sighted</Option>
// // //           <Option value="waived">Waived</Option>
// // //           <Option value="deferred">Deferred</Option>
// // //         </Select>
// // //       ),
// // //     },
// // //     {
// // //       title: "Co status",
// // //       dataIndex: "status",
// // //       width: 120,
// // //       render: (status) => renderStatusTag(status),
// // //     },
// // //     {
// // //       title: "Co comment",
// // //       dataIndex: "comment",
// // //       width: 200,
// // //       render: (text, record) => (
// // //         <Input.TextArea
// // //           rows={1}
// // //           size="small"
// // //           value={text}
// // //           onChange={(e) => handleCommentChange(record.docIdx, e.target.value)}
// // //         />
// // //       ),
// // //     },
// // //     {
// // //       title: "View",
// // //       key: "view",
// // //       width: 80,
// // //       render: (_, record) =>
// // //         record.fileUrl ? (
// // //           <Button
// // //             type="primary"
// // //             icon={<EyeOutlined />}
// // //             onClick={() => {
// // //               const newWindow = window.open(
// // //                 record.fileUrl,
// // //                 "_blank",
// // //                 "noopener,noreferrer"
// // //               );
// // //               if (!newWindow)
// // //                 message.error("Popup blocked! Please allow popups.");
// // //             }}
// // //             size="small"
// // //             style={{
// // //               backgroundColor: PRIMARY_BLUE,
// // //               borderColor: PRIMARY_BLUE,
// // //               borderRadius: 6,
// // //             }}
// // //           >
// // //             View
// // //           </Button>
// // //         ) : (
// // //           <Tag color="default">No File</Tag>
// // //         ),
// // //     },
// // //     {
// // //       title: "Delete",
// // //       key: "delete",
// // //       width: 80,
// // //       render: (_, record) => (
// // //         <Button
// // //           type="text"
// // //           danger
// // //           size="small"
// // //           onClick={() => handleDelete(record.docIdx)}
// // //         >
// // //           Delete
// // //         </Button>
// // //       ),
// // //     },
// // //   ];

// // //   const total = docs.length;
// // //   // NOTE: Using action 'submitted' for the calculation
// // //   const submitted = docs.filter(
// // //     (d) => d.action === "submitted" || d.action === "uploaded"
// // //   ).length;
// // //   const pending = docs.filter(
// // //     (d) =>
// // //       d.action === "pendingrm" ||
// // //       d.action === "pending_from_co" ||
// // //       d.action === "tbo"
// // //   ).length;
// // //   const deferred = docs.filter((d) => d.action === "deferred").length;
// // //   const progressPercent =
// // //     total === 0 ? 0 : Math.round((submitted / total) * 100);

// // //   return (
// // //     <>
// // //       <style>{customStyles}</style>
// // //       <Modal
// // //         title={`Review Checklist  ${checklist?.title || ""}`}
// // //         open={open}
// // //         onCancel={onClose}
// // //         width={1150}
// // //         bodyStyle={{ padding: "0 24px 24px" }}
// // //         footer={[
// // //           // <Button
// // //           //   key="submit-checker"
// // //           //   disabled={!allDocsApproved || showCheckerSubmission}
// // //           //   type="default"
// // //           //   onClick={() => {
// // //           //     setShowCheckerSubmission(true);
// // //           //     setTimeout(() => {
// // //           //       const el = document.getElementById("checker-final-section");
// // //           //       if (el) el.scrollIntoView({ behavior: "smooth" });
// // //           //     }, 200);
// // //           //   }}
// // //           //   style={{
// // //           //     backgroundColor: ACCENT_LIME,
// // //           //     borderColor: ACCENT_LIME,
// // //           //     color: PRIMARY_BLUE,
// // //           //     fontWeight: "bold",
// // //           //     borderRadius: 8,
// // //           //     opacity: !allDocsApproved ? 0.6 : 1,
// // //           //     cursor: !allDocsApproved ? "not-allowed" : "pointer",
// // //           //   }}
// // //           // >
// // //           //   Submit to Checker
// // //           // </Button>,
// // //           <Button key="cancel" onClick={onClose}>
// // //             Close
// // //           </Button>,
// // //           <Button
// // //             key="submit"
// // //             type="primary"
// // //             // Retaining the original logic: disabled if all docs are 'submitted'
// // //             disabled={allDocsApproved}
// // //             loading={isLoading}
// // //             onClick={submitToRM}
// // //           >
// // //             Submit to RM
// // //           </Button>,
// // //         ]}
// // //       >
// // //         {checklist && (
// // //           <>
// // //             <Card
// // //               className="checklist-info-card"
// // //               size="small"
// // //               title={
// // //                 <span style={{ color: PRIMARY_BLUE, fontSize: 14 }}>
// // //                   Checklist Details
// // //                 </span>
// // //               }
// // //               style={{
// // //                 marginBottom: 18,
// // //                 marginTop: 24,
// // //                 borderRadius: 10,
// // //                 border: `1px solid #e0e0e0`,
// // //               }}
// // //             >
// // //               <Descriptions size="middle" column={{ xs: 1, sm: 2, lg: 3 }}>
// // //                 <Descriptions.Item label="DCL No">
// // //                   {checklist.dclNo}
// // //                 </Descriptions.Item>
// // //                 <Descriptions.Item label="Created At">
// // //                   {checklist.createdAt}
// // //                 </Descriptions.Item>
// // //                 <Descriptions.Item label="Loan Type">
// // //                   {checklist.loanType}
// // //                 </Descriptions.Item>
// // //                 <Descriptions.Item label="Created By">
// // //                   {checklist.createdBy?.name}
// // //                 </Descriptions.Item>
// // //                 <Descriptions.Item label="RM">
// // //                   {checklist.assignedToRM?.name}
// // //                 </Descriptions.Item>
// // //                 <Descriptions.Item label="Co-Checker">
// // //                   {checklist.assignedToCoChecker?.name || "Pending"}
// // //                 </Descriptions.Item>
// // //               </Descriptions>
// // //             </Card>

// // //             <div
// // //               style={{
// // //                 padding: "16px",
// // //                 background: "#f7f9fc",
// // //                 borderRadius: 8,
// // //                 border: "1px solid #e0e0e0",
// // //                 marginBottom: 18,
// // //               }}
// // //             >
// // //               <div
// // //                 style={{
// // //                   display: "flex",
// // //                   justifyContent: "space-between",
// // //                   marginBottom: 12,
// // //                 }}
// // //               >
// // //                 <div style={{ fontWeight: "700", color: PRIMARY_BLUE }}>
// // //                   Total: {total}
// // //                 </div>
// // //                 <div style={{ fontWeight: "700", color: SECONDARY_PURPLE }}>
// // //                   Pending: {pending}
// // //                 </div>
// // //                 <div style={{ fontWeight: "700", color: ACCENT_LIME }}>
// // //                   Submitted: {submitted}
// // //                 </div>
// // //                 <div style={{ fontWeight: "700", color: "#ff4d4f" }}>
// // //                   Deferred: {deferred}
// // //                 </div>
// // //               </div>
// // //               <div
// // //                 style={{
// // //                   width: "100%",
// // //                   height: 12,
// // //                   background: "#e0e0e0",
// // //                   borderRadius: 50,
// // //                 }}
// // //               >
// // //                 <div
// // //                   style={{
// // //                     height: "100%",
// // //                     width: `${progressPercent}%`,
// // //                     background: PRIMARY_BLUE,
// // //                     borderRadius: 50,
// // //                     transition: "width 0.4s ease",
// // //                   }}
// // //                 ></div>
// // //               </div>
// // //               <div
// // //                 style={{
// // //                   textAlign: "right",
// // //                   marginTop: 4,
// // //                   fontWeight: "700",
// // //                   color: PRIMARY_BLUE,
// // //                 }}
// // //               >
// // //                 {progressPercent}%
// // //               </div>
// // //             </div>

// // //             <h3
// // //               style={{
// // //                 margin: "16px 0 8px",
// // //                 color: PRIMARY_BLUE,
// // //                 fontWeight: "bold",
// // //               }}
// // //             >
// // //               Add New Document
// // //             </h3>
// // //             <DocumentInputSection
// // //               uniqueCategories={uniqueCategories}
// // //               selectedCategoryName={selectedCategoryName}
// // //               setSelectedCategoryName={setSelectedCategoryName}
// // //               newDocName={newDocName}
// // //               setNewDocName={setNewDocName}
// // //               loanType={checklist.loanType}
// // //               handleAddNewDocument={handleAddNewDocument}
// // //             />

// // //             <h3
// // //               style={{
// // //                 margin: "16px 0 8px",
// // //                 color: PRIMARY_BLUE,
// // //                 fontWeight: "bold",
// // //               }}
// // //             >
// // //               Required Documents
// // //             </h3>
// // //             <Table
// // //               className="doc-table"
// // //               rowKey="docIdx"
// // //               size="middle"
// // //               pagination={false}
// // //               dataSource={docs}
// // //               columns={columns}
// // //               bordered={false}
// // //             />

// // //             {/* 🟢 ADDED: Render the Comment Trail section */}
// // //             <h3
// // //               style={{
// // //                 margin: "24px 0 8px",
// // //                 color: PRIMARY_BLUE,
// // //                 fontWeight: "bold",
// // //               }}
// // //             >
// // //               Comment Trail
// // //             </h3>
// // //             <CommentTrail comments={comments} isLoading={commentsLoading} />

// // //             {allDocsApproved && (
// // //               <div
// // //                 id="checker-final-section"
// // //                 style={{
// // //                   marginTop: 32,
// // //                   padding: "20px",
// // //                   background: "#fff",
// // //                   border: "1px solid #e0e0e0",
// // //                   borderRadius: 8,
// // //                   marginBottom: 40,
// // //                 }}
// // //               >
// // //                 <h3
// // //                   style={{
// // //                     color: PRIMARY_BLUE,
// // //                     fontWeight: "bold",
// // //                     marginBottom: 12,
// // //                   }}
// // //                 >
// // //                   Final Comments & Attachments for Checker
// // //                 </h3>
// // //                 <Input.TextArea
// // //                   rows={4}
// // //                   placeholder="Enter your final comments for the checker..."
// // //                   value={checkerComment}
// // //                   onChange={(e) => setCheckerComment(e.target.value)}
// // //                   style={{ marginBottom: 16 }}
// // //                 />
// // //                 <Upload
// // //                   multiple
// // //                   beforeUpload={(file) => {
// // //                     setCheckerFiles((prev) => [...prev, file]);
// // //                     return false;
// // //                   }}
// // //                   fileList={checkerFiles.map((file) => ({
// // //                     uid: file.uid || file.name,
// // //                     name: file.name,
// // //                   }))}
// // //                   onRemove={(file) =>
// // //                     setCheckerFiles((prev) =>
// // //                       prev.filter((f) => f.name !== file.name)
// // //                     )
// // //                   }
// // //                 >
// // //                   <Button icon={<UploadOutlined />}>Upload Files</Button>
// // //                 </Upload>
// // //                 <div style={{ marginTop: 20 }}>
// // //                   <Button
// // //                     type="primary"
// // //                     loading={isCheckerSubmitting}
// // //                     onClick={submitToCheckers}
// // //                     disabled={
// // //                       checkerFiles.length === 0 && !checkerComment.trim()
// // //                     }
// // //                   >
// // //                     Submit to Checker
// // //                   </Button>
// // //                 </div>
// // //               </div>
// // //             )}
// // //           </>
// // //         )}

// // //         {/* This is the creator's comment box, now correctly placed after the comment trail */}
// // //         {!allDocsApproved && (
// // //           <Input.TextArea
// // //             rows={3}
// // //             placeholder="Enter comment for RM..."
// // //             value={creatorComment}
// // //             onChange={(e) => setCreatorComment(e.target.value)}
// // //             style={{ marginBottom: 16, marginTop: 25 }}
// // //           />
// // //         )}
// // //       </Modal>
// // //     </>
// // //   );
// // // };

// // // export default ReviewChecklistModal;
// // import React, { useState, useEffect } from "react";
// // import {
// //   Button,
// //   Table,
// //   Tag,
// //   Modal,
// //   Input,
// //   Select,
// //   Card,
// //   Descriptions,
// //   message,
// //   Upload,
// //   Spin,
// //   List,
// //   Avatar,
// // } from "antd";
// // import { UploadOutlined, EyeOutlined, UserOutlined } from "@ant-design/icons";

// // import DocumentInputSection from "../../components/creator/DocumentInputSection";
// // import {
// //   useSubmitChecklistToRMMutation,
// //   useUpdateChecklistStatusMutation,
// //   useGetChecklistCommentsQuery,
// // } from "../../api/checklistApi";

// // const { Option } = Select;

// // // Theme Colors
// // const PRIMARY_BLUE = "#164679";
// // const ACCENT_LIME = "#b5d334";
// // const SECONDARY_PURPLE = "#7e6496";

// // // Custom CSS
// // const customStyles = `
// //   .ant-modal-header { background-color: ${PRIMARY_BLUE} !important; padding: 18px 24px !important; }
// //   .ant-modal-title { color: white !important; font-size: 1.15rem !important; font-weight: 700 !important; letter-spacing: 0.5px; }
// //   .ant-modal-close-x { color: white !important; }

// //   .checklist-info-card .ant-card-head { border-bottom: 2px solid ${ACCENT_LIME} !important; }
// //   .checklist-info-card .ant-descriptions-item-label { font-weight: 600 !important; color: ${SECONDARY_PURPLE} !important; padding-bottom: 4px; }
// //   .checklist-info-card .ant-descriptions-item-content { color: ${PRIMARY_BLUE} !important; font-weight: 700 !important; font-size: 13px !important; }

// //   .doc-table.ant-table-wrapper table { border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; }
// //   .doc-table .ant-table-thead > tr > th { background-color: #f7f9fc !important; color: ${PRIMARY_BLUE} !important; font-weight: 600 !important; padding: 12px 16px !important; }
// //   .doc-table .ant-table-tbody > tr > td { padding: 10px 16px !important; border-bottom: 1px dashed #f0f0f0 !important; }

// //   .ant-input, .ant-select-selector { border-radius: 6px !important; border-color: #e0e0e0 !important; }
// //   .ant-input:focus, .ant-select-focused .ant-select-selector { box-shadow: 0 0 0 2px rgba(22, 70, 121, 0.2) !important; border-color: ${PRIMARY_BLUE} !important; }

// //   .status-tag { font-weight: 700 !important; border-radius: 999px !important; padding: 3px 8px !important; text-transform: capitalize; min-width: 80px; text-align: center; display: inline-flex; align-items: center; gap: 4px; justify-content: center; }

// //   .ant-modal-footer .ant-btn { border-radius: 8px; font-weight: 600; height: 38px; padding: 0 16px; }
// //   .ant-modal-footer .ant-btn-primary { background-color: ${PRIMARY_BLUE} !important; border-color: ${PRIMARY_BLUE} !important; }
// // `;

// // const getRoleTag = (role) => {
// //   let color = "blue";
// //   const roleLower = role.toLowerCase();
// //   switch (roleLower) {
// //     case "rm":
// //       color = "purple";
// //       break;
// //     case "creator":
// //       color = "green";
// //       break;
// //     case "co_checker":
// //       color = "volcano";
// //       break;
// //     case "system":
// //       color = "default";
// //       break;
// //     default:
// //       color = "blue";
// //   }
// //   return (
// //     <Tag color={color} style={{ marginLeft: 8, textTransform: "uppercase" }}>
// //       {roleLower.replace(/_/g, " ")}
// //     </Tag>
// //   );
// // };

// // const CommentTrail = ({ comments, isLoading }) => {
// //   if (isLoading)
// //     return (
// //       <div style={{ textAlign: "center", padding: 20 }}>
// //         <Spin />
// //       </div>
// //     );
// //   if (!comments || comments.length === 0)
// //     return (
// //       <div style={{ paddingLeft: 15, borderLeft: `3px solid ${PRIMARY_BLUE}` }}>
// //         <i>No historical comments yet.</i>
// //       </div>
// //     );

// //   return (
// //     <div style={{ overflowX: "auto", whiteSpace: "nowrap", paddingBottom: 8 }}>
// //       <div style={{ display: "inline-flex", gap: 16 }}>
// //         {comments.map((item, index) => (
// //           <Card
// //             key={index}
// //             style={{
// //               minWidth: 420,
// //               maxWidth: 420,
// //               borderLeft: `4px solid ${PRIMARY_BLUE}`,
// //             }}
// //           >
// //             <List.Item.Meta
// //               avatar={<Avatar icon={<UserOutlined />} />}
// //               title={
// //                 <div
// //                   style={{ display: "flex", justifyContent: "space-between" }}
// //                 >
// //                   <div>
// //                     <b>{item.userId?.name || "System"}</b>{" "}
// //                     {getRoleTag(item.userId?.role || "system")}
// //                   </div>
// //                   <span style={{ fontSize: 12, color: "#888" }}>
// //                     {new Date(
// //                       item.createdAt || item.timestamp
// //                     ).toLocaleString()}
// //                   </span>
// //                 </div>
// //               }
// //               description={
// //                 <div
// //                   style={{
// //                     whiteSpace: "normal",
// //                     wordBreak: "break-word",
// //                     marginTop: 8,
// //                   }}
// //                 >
// //                   {item.message}
// //                 </div>
// //               }
// //             />
// //           </Card>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // const ReviewChecklistModal = ({ checklist, open, onClose }) => {
// //   const [docs, setDocs] = useState([]);
// //   const [newDocName, setNewDocName] = useState("");
// //   const [selectedCategoryName, setSelectedCategoryName] = useState(null);
// //   const [showCheckerSubmission, setShowCheckerSubmission] = useState(false);
// //   const [creatorComment, setCreatorComment] = useState("");
// //   const [checkerComment, setCheckerComment] = useState("");
// //   const [checkerFiles, setCheckerFiles] = useState([]);

// //   const [submitRmChecklist, { isLoading }] = useSubmitChecklistToRMMutation();
// //   const [updateChecklistStatus, { isLoading: isCheckerSubmitting }] =
// //     useUpdateChecklistStatusMutation();
// //   const { data: comments, isLoading: commentsLoading } =
// //     useGetChecklistCommentsQuery(checklist?._id, { skip: !checklist?._id });

// //   // Disable actions based on checklist status
// //   const isActionDisabled = !["co_creator_review"].includes(checklist?.status);

// //   useEffect(() => {
// //     if (!checklist || !checklist.documents) return;

// //     const flatDocs = checklist.documents.reduce((acc, item) => {
// //       if (
// //         item.docList &&
// //         Array.isArray(item.docList) &&
// //         item.docList.length > 0
// //       ) {
// //         const nestedDocs = item.docList.map((doc) => ({
// //           ...doc,
// //           category: item.category,
// //         }));
// //         return acc.concat(nestedDocs);
// //       }
// //       if (item.category) return acc.concat(item);
// //       return acc;
// //     }, []);

// //     const preparedDocs = flatDocs.map((doc, idx) => ({
// //       ...doc,
// //       docIdx: idx,
// //       status: doc.status || "pendingrm",
// //       action: doc.status || "pendingrm",
// //       comment: doc.comment || "",
// //       fileUrl: doc.fileUrl || null,
// //     }));

// //     setDocs(preparedDocs);
// //   }, [checklist]);

// //   const handleAddNewDocument = () => {
// //     if (!newDocName.trim() || !selectedCategoryName)
// //       return message.error(
// //         "Please enter a document name and select a category."
// //       );
// //     setDocs((prevDocs) => [
// //       ...prevDocs,
// //       {
// //         docIdx: prevDocs.length,
// //         name: newDocName.trim(),
// //         category: selectedCategoryName,
// //         status: "pendingrm",
// //         action: "pendingrm",
// //         comment: "",
// //         fileUrl: null,
// //       },
// //     ]);
// //     message.success(
// //       `Document '${newDocName.trim()}' added to ${selectedCategoryName}.`
// //     );
// //     setNewDocName("");
// //     setSelectedCategoryName(null);
// //   };

// //   const handleActionChange = (idx, value) => {
// //     const updated = [...docs];
// //     updated[idx].action = value;
// //     updated[idx].status = value;
// //     setDocs(updated);
// //   };

// //   const handleCommentChange = (idx, value) => {
// //     const updated = [...docs];
// //     updated[idx].comment = value;
// //     setDocs(updated);
// //   };

// //   const handleDelete = (idx) => {
// //     const updated = docs
// //       .filter((_, i) => i !== idx)
// //       .map((doc, i) => ({ ...doc, docIdx: i }));
// //     setDocs(updated);
// //     message.success("Document deleted.");
// //   };

// //   const handleFileUpload = (docIdx, file) => {
// //     const updated = [...docs];
// //     updated[docIdx].fileUrl = URL.createObjectURL(file);
// //     updated[docIdx].status = "uploaded";
// //     setDocs(updated);
// //     message.success("File uploaded");
// //     return false;
// //   };

// //   const submitToRM = async () => {
// //     try {
// //       if (!checklist?._id) throw new Error("Checklist ID missing");
// //       const nestedDocuments = docs.reduce((acc, doc) => {
// //         let categoryGroup = acc.find((c) => c.category === doc.category);
// //         if (!categoryGroup) {
// //           categoryGroup = { category: doc.category, docList: [] };
// //           acc.push(categoryGroup);
// //         }
// //         categoryGroup.docList.push({
// //           _id: doc._id,
// //           name: doc.name,
// //           category: doc.category,
// //           status: doc.status,
// //           action: doc.action,
// //           comment: doc.comment,
// //           fileUrl: doc.fileUrl,
// //           deferralReason: doc.deferralReason,
// //         });
// //         return acc;
// //       }, []);
// //       const payload = { creatorComment, documents: nestedDocuments };
// //       await submitRmChecklist({ id: checklist._id, body: payload }).unwrap();
// //       message.success("Checklist submitted to RM!");
// //       onClose();
// //     } catch (err) {
// //       console.error(err);
// //       message.error(err?.data?.error || "Failed to submit checklist to RM");
// //     }
// //   };

// //   const submitToCheckers = async () => {
// //     if (!checklist?.dclNo) return message.error("DCL No missing.");
// //     try {
// //       message.loading({
// //         content: "Submitting checklist to Co-Checker...",
// //         key: "checkerSubmit",
// //       });
// //       const payload = {
// //         dclNo: checklist.dclNo,
// //         documents: docs,
// //         status: "co_checker_review",
// //         submittedToCoChecker: true,
// //         finalComment: checkerComment,
// //         attachments: checkerFiles,
// //       };
// //       await updateChecklistStatus(payload).unwrap();
// //       message.success({
// //         content: "Checklist submitted to Co-Checker!",
// //         key: "checkerSubmit",
// //         duration: 3,
// //       });
// //       onClose();
// //     } catch (err) {
// //       console.error(err);
// //       message.error({
// //         content: err?.data?.error || "Failed to submit checklist.",
// //         key: "checkerSubmit",
// //       });
// //     }
// //   };

// //   const uniqueCategories = [...new Set(docs.map((doc) => doc.category))];
// //   const allDocsApproved =
// //     docs.length > 0 && docs.every((doc) => doc.action === "submitted");
// //   const total = docs.length;
// //   const submitted = docs.filter(
// //     (d) => d.action === "submitted" || d.action === "uploaded"
// //   ).length;
// //   const pending = docs.filter((d) =>
// //     ["pendingrm", "pending_from_co", "tbo"].includes(d.action)
// //   ).length;
// //   const deferred = docs.filter((d) => d.action === "deferred").length;
// //   const progressPercent =
// //     total === 0 ? 0 : Math.round((submitted / total) * 100);

// //   const columns = [
// //     {
// //       title: "Category",
// //       dataIndex: "category",
// //       width: 120,
// //       render: (text) => (
// //         <span
// //           style={{ fontSize: 12, color: SECONDARY_PURPLE, fontWeight: 500 }}
// //         >
// //           {text}
// //         </span>
// //       ),
// //     },
// //     {
// //       title: "Document Name",
// //       dataIndex: "name",
// //       width: 250,
// //       render: (text, record) => (
// //         <Input
// //           size="small"
// //           value={record.name}
// //           onChange={(e) => {
// //             const updated = [...docs];
// //             updated[record.docIdx].name = e.target.value;
// //             setDocs(updated);
// //           }}
// //           disabled={isActionDisabled}
// //         />
// //       ),
// //     },
// //     {
// //       title: "Action",
// //       dataIndex: "action",
// //       width: 140,
// //       render: (text, record) => (
// //         <Select
// //           size="small"
// //           value={record.action}
// //           style={{ width: "100%" }}
// //           onChange={(val) => handleActionChange(record.docIdx, val)}
// //           disabled={isActionDisabled}
// //         >
// //           <Option value="submitted">Submitted</Option>
// //           <Option value="pendingrm">Pending from RM</Option>
// //           <Option value="pending_from_co">Pending from Co</Option>
// //           <Option value="tbo">TBO</Option>
// //           <Option value="sighted">Sighted</Option>
// //           <Option value="waived">Waived</Option>
// //           <Option value="deferred">Deferred</Option>
// //         </Select>
// //       ),
// //     },
// //     {
// //       title: "Co status",
// //       dataIndex: "status",
// //       width: 120,
// //       render: (status) => (
// //         <Tag className="status-tag">{status.replace(/_/g, " ")}</Tag>
// //       ),
// //     },
// //     {
// //       title: "Co comment",
// //       dataIndex: "comment",
// //       width: 200,
// //       render: (text, record) => (
// //         <Input.TextArea
// //           rows={1}
// //           size="small"
// //           value={text}
// //           onChange={(e) => handleCommentChange(record.docIdx, e.target.value)}
// //           disabled={isActionDisabled}
// //         />
// //       ),
// //     },
// //     {
// //       title: "View",
// //       key: "view",
// //       width: 80,
// //       render: (_, record) =>
// //         record.fileUrl ? (
// //           <Button
// //             type="primary"
// //             icon={<EyeOutlined />}
// //             onClick={() => {
// //               const newWindow = window.open(
// //                 record.fileUrl,
// //                 "_blank",
// //                 "noopener,noreferrer"
// //               );
// //               if (!newWindow)
// //                 message.error("Popup blocked! Please allow popups.");
// //             }}
// //             size="small"
// //             style={{
// //               backgroundColor: PRIMARY_BLUE,
// //               borderColor: PRIMARY_BLUE,
// //               borderRadius: 6,
// //             }}
// //             disabled={isActionDisabled}
// //           >
// //             View
// //           </Button>
// //         ) : (
// //           <Tag color="default">No File</Tag>
// //         ),
// //     },
// //     {
// //       title: "Delete",
// //       key: "delete",
// //       width: 80,
// //       render: (_, record) => (
// //         <Button
// //           type="text"
// //           danger
// //           size="small"
// //           onClick={() => handleDelete(record.docIdx)}
// //           disabled={isActionDisabled}
// //         >
// //           Delete
// //         </Button>
// //       ),
// //     },
// //   ];

// //   return (
// //     <>
// //       <style>{customStyles}</style>
// //       <Modal
// //         title={`Review Checklist  ${checklist?.title || ""}`}
// //         open={open}
// //         onCancel={onClose}
// //         width={1150}
// //         bodyStyle={{ padding: "0 24px 24px" }}
// //         footer={[
// //           <Button key="cancel" onClick={onClose}>
// //             Close
// //           </Button>,
// //           <Button
// //             key="submit"
// //             type="primary"
// //             disabled={isActionDisabled || allDocsApproved}
// //             loading={isLoading}
// //             onClick={submitToRM}
// //           >
// //             Submit to RM
// //           </Button>,
// //         ]}
// //       >
// //         {checklist && (
// //           <>
// //             <Card
// //               className="checklist-info-card"
// //               size="small"
// //               title={
// //                 <span style={{ color: PRIMARY_BLUE, fontSize: 14 }}>
// //                   Checklist Details
// //                 </span>
// //               }
// //               style={{
// //                 marginBottom: 18,
// //                 marginTop: 24,
// //                 borderRadius: 10,
// //                 border: `1px solid #e0e0e0`,
// //               }}
// //             >
// //               <Descriptions size="middle" column={{ xs: 1, sm: 2, lg: 3 }}>
// //                 <Descriptions.Item label="DCL No">
// //                   {checklist.dclNo}
// //                 </Descriptions.Item>
// //                 <Descriptions.Item label="Created At">
// //                   {checklist.createdAt}
// //                 </Descriptions.Item>
// //                 <Descriptions.Item label="Loan Type">
// //                   {checklist.loanType}
// //                 </Descriptions.Item>
// //                 <Descriptions.Item label="Created By">
// //                   {checklist.createdBy?.name}
// //                 </Descriptions.Item>
// //                 <Descriptions.Item label="RM">
// //                   {checklist.assignedToRM?.name}
// //                 </Descriptions.Item>
// //                 <Descriptions.Item label="Co-Checker">
// //                   {checklist.assignedToCoChecker?.name || "Pending"}
// //                 </Descriptions.Item>
// //               </Descriptions>
// //             </Card>

// //             <div
// //               style={{
// //                 padding: "16px",
// //                 background: "#f7f9fc",
// //                 borderRadius: 8,
// //                 border: "1px solid #e0e0e0",
// //                 marginBottom: 18,
// //               }}
// //             >
// //               <div
// //                 style={{
// //                   display: "flex",
// //                   justifyContent: "space-between",
// //                   marginBottom: 12,
// //                 }}
// //               >
// //                 <div style={{ fontWeight: "700", color: PRIMARY_BLUE }}>
// //                   Total: {total}
// //                 </div>
// //                 <div style={{ fontWeight: "700", color: SECONDARY_PURPLE }}>
// //                   Pending: {pending}
// //                 </div>
// //                 <div style={{ fontWeight: "700", color: ACCENT_LIME }}>
// //                   Submitted: {submitted}
// //                 </div>
// //                 <div style={{ fontWeight: "700", color: "#ff4d4f" }}>
// //                   Deferred: {deferred}
// //                 </div>
// //               </div>
// //               <div
// //                 style={{
// //                   width: "100%",
// //                   height: 12,
// //                   background: "#e0e0e0",
// //                   borderRadius: 50,
// //                 }}
// //               >
// //                 <div
// //                   style={{
// //                     height: "100%",
// //                     width: `${progressPercent}%`,
// //                     background: PRIMARY_BLUE,
// //                     borderRadius: 50,
// //                     transition: "width 0.4s ease",
// //                   }}
// //                 ></div>
// //               </div>
// //               <div
// //                 style={{
// //                   textAlign: "right",
// //                   marginTop: 4,
// //                   fontWeight: "700",
// //                   color: PRIMARY_BLUE,
// //                 }}
// //               >
// //                 {progressPercent}%
// //               </div>
// //             </div>

// //             <h3
// //               style={{
// //                 margin: "16px 0 8px",
// //                 color: PRIMARY_BLUE,
// //                 fontWeight: "bold",
// //               }}
// //             >
// //               Add New Document
// //             </h3>
// //             <DocumentInputSection
// //               uniqueCategories={uniqueCategories}
// //               selectedCategoryName={selectedCategoryName}
// //               setSelectedCategoryName={setSelectedCategoryName}
// //               newDocName={newDocName}
// //               setNewDocName={setNewDocName}
// //               loanType={checklist.loanType}
// //               handleAddNewDocument={handleAddNewDocument}
// //               disabled={isActionDisabled}
// //             />

// //             <h3
// //               style={{
// //                 margin: "16px 0 8px",
// //                 color: PRIMARY_BLUE,
// //                 fontWeight: "bold",
// //               }}
// //             >
// //               Required Documents
// //             </h3>
// //             <Table
// //               className="doc-table"
// //               rowKey="docIdx"
// //               size="middle"
// //               pagination={false}
// //               dataSource={docs}
// //               columns={columns}
// //               bordered={false}
// //             />

// //             <h3
// //               style={{
// //                 margin: "24px 0 8px",
// //                 color: PRIMARY_BLUE,
// //                 fontWeight: "bold",
// //               }}
// //             >
// //               Comment Trail
// //             </h3>
// //             <CommentTrail comments={comments} isLoading={commentsLoading} />

// //             {allDocsApproved && (
// //               <div
// //                 id="checker-final-section"
// //                 style={{
// //                   marginTop: 32,
// //                   padding: "20px",
// //                   background: "#fff",
// //                   border: "1px solid #e0e0e0",
// //                   borderRadius: 8,
// //                   marginBottom: 40,
// //                 }}
// //               >
// //                 <h3 style={{ color: PRIMARY_BLUE, fontWeight: "bold" }}>
// //                   Submit to Co-Checker
// //                 </h3>
// //                 <Input.TextArea
// //                   rows={4}
// //                   value={checkerComment}
// //                   onChange={(e) => setCheckerComment(e.target.value)}
// //                   placeholder="Final comment for co-checker..."
// //                   disabled={isActionDisabled}
// //                   style={{ marginBottom: 16 }}
// //                 />
// //                 <Upload
// //                   multiple
// //                   beforeUpload={(file) => {
// //                     handleFileUpload(0, file);
// //                     return false;
// //                   }}
// //                   disabled={isActionDisabled}
// //                 >
// //                   <Button icon={<UploadOutlined />} disabled={isActionDisabled}>
// //                     Upload Files
// //                   </Button>
// //                 </Upload>
// //                 <Button
// //                   type="primary"
// //                   style={{ marginLeft: 12 }}
// //                   onClick={submitToCheckers}
// //                   loading={isCheckerSubmitting}
// //                   disabled={
// //                     isActionDisabled ||
// //                     (checkerFiles.length === 0 && !checkerComment.trim())
// //                   }
// //                 >
// //                   Submit to Checker
// //                 </Button>
// //               </div>
// //             )}
// //           </>
// //         )}
// //       </Modal>
// //     </>
// //   );
// // };

// // export default ReviewChecklistModal;
// // import React, { useState, useEffect } from "react";
// // import {
// //   Button,
// //   Table,
// //   Tag,
// //   Modal,
// //   Input,
// //   Select,
// //   Card,
// //   Descriptions,
// //   message,
// //   Upload,
// //   Spin,
// //   List,
// //   Avatar,
// //   Popconfirm,
// // } from "antd";
// // import { UploadOutlined, EyeOutlined, UserOutlined } from "@ant-design/icons";

// // import DocumentInputSection from "../../components/creator/DocumentInputSection";
// // import {
// //   useSubmitChecklistToRMMutation,
// //   useUpdateChecklistStatusMutation,
// //   useGetChecklistCommentsQuery,
// // } from "../../api/checklistApi";

// // const { Option } = Select;

// // // Theme Colors
// // const PRIMARY_BLUE = "#164679";
// // const ACCENT_LIME = "#b5d334";
// // const SECONDARY_PURPLE = "#7e6496";

// // // Custom CSS
// // const customStyles = `
// //   .ant-modal-header { background-color: ${PRIMARY_BLUE} !important; padding: 18px 24px !important; }
// //   .ant-modal-title { color: white !important; font-size: 1.15rem !important; font-weight: 700 !important; letter-spacing: 0.5px; }
// //   .ant-modal-close-x { color: white !important; }

// //   .checklist-info-card .ant-card-head { border-bottom: 2px solid ${ACCENT_LIME} !important; }
// //   .checklist-info-card .ant-descriptions-item-label { font-weight: 600 !important; color: ${SECONDARY_PURPLE} !important; padding-bottom: 4px; }
// //   .checklist-info-card .ant-descriptions-item-content { color: ${PRIMARY_BLUE} !important; font-weight: 700 !important; font-size: 13px !important; }

// //   .doc-table.ant-table-wrapper table { border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; }
// //   .doc-table .ant-table-thead > tr > th { background-color: #f7f9fc !important; color: ${PRIMARY_BLUE} !important; font-weight: 600 !important; padding: 12px 16px !important; }
// //   .doc-table .ant-table-tbody > tr > td { padding: 10px 16px !important; border-bottom: 1px dashed #f0f0f0 !important; }

// //   .ant-input, .ant-select-selector { border-radius: 6px !important; border-color: #e0e0e0 !important; }
// //   .ant-input:focus, .ant-select-focused .ant-select-selector { box-shadow: 0 0 0 2px rgba(22, 70, 121, 0.2) !important; border-color: ${PRIMARY_BLUE} !important; }

// //   .status-tag { font-weight: 700 !important; border-radius: 999px !important; padding: 3px 8px !important; text-transform: capitalize; min-width: 80px; text-align: center; display: inline-flex; align-items: center; gap: 4px; justify-content: center; }

// //   .ant-modal-footer .ant-btn { border-radius: 8px; font-weight: 600; height: 38px; padding: 0 16px; }
// //   .ant-modal-footer .ant-btn-primary { background-color: ${PRIMARY_BLUE} !important; border-color: ${PRIMARY_BLUE} !important; }
// // `;

// //  const renderStatusTag = (status) => {
// //     let color = "default";

// //     switch (status) {
// //       case "submitted":
// //         color = "green"; // Green for submitted
// //         break;
// //       case "pendingrm":
// //         color = "red"; // Red for pendingrm
// //         break;
// //       case "deferred":
// //       case "waived":
// //         color = "orange"; // Amber (orange) for deferred and waived
// //         break;
// //       case "sighted":
// //         case "tbo":
// //         color = "blue"; // Blue for sighted and tbo
// //         break;
// //       default:
// //         color = "default"; // Default color for others
// //     }

// // const getRoleTag = (role) => {
// //   let color = "blue";
// //   const roleLower = (role || "").toLowerCase();
// //   switch (roleLower) {
// //     case "rm":
// //       color = "purple";
// //       break;
// //     case "creator":
// //       color = "green";
// //       break;
// //     case "co_checker":
// //       color = "volcano";
// //       break;
// //     case "system":
// //       color = "default";
// //       break;
// //     default:
// //       color = "blue";
// //   }
// //   return (
// //     <Tag color={color} style={{ marginLeft: 8, textTransform: "uppercase" }}>
// //       {roleLower.replace(/_/g, " ")}
// //     </Tag>
// //   );
// // };

// // const CommentTrail = ({ comments, isLoading }) => {
// //   if (isLoading)
// //     return (
// //       <div style={{ textAlign: "center", padding: 20 }}>
// //         <Spin />
// //       </div>
// //     );
// //   if (!comments || comments.length === 0)
// //     return (
// //       <div style={{ paddingLeft: 15, borderLeft: `3px solid ${PRIMARY_BLUE}` }}>
// //         <i>No historical comments yet.</i>
// //       </div>
// //     );

// //   return (
// //     <div style={{ overflowX: "auto", whiteSpace: "nowrap", paddingBottom: 8 }}>
// //       <div style={{ display: "inline-flex", gap: 16 }}>
// //         {comments.map((item, index) => (
// //           <Card
// //             key={index}
// //             style={{
// //               minWidth: 420,
// //               maxWidth: 420,
// //               borderLeft: `4px solid ${PRIMARY_BLUE}`,
// //             }}
// //           >
// //             <List.Item.Meta
// //               avatar={<Avatar icon={<UserOutlined />} />}
// //               title={
// //                 <div
// //                   style={{ display: "flex", justifyContent: "space-between" }}
// //                 >
// //                   <div>
// //                     <b>{item.userId?.name || "System"}</b>{" "}
// //                     {getRoleTag(item.userId?.role || "system")}
// //                   </div>
// //                   <span style={{ fontSize: 12, color: "#888" }}>
// //                     {new Date(
// //                       item.createdAt || item.timestamp
// //                     ).toLocaleString()}
// //                   </span>
// //                 </div>
// //               }
// //               description={
// //                 <div
// //                   style={{
// //                     whiteSpace: "normal",
// //                     wordBreak: "break-word",
// //                     marginTop: 8,
// //                   }}
// //                 >
// //                   {item.message}
// //                 </div>
// //               }
// //             />
// //           </Card>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // const ReviewChecklistModal = ({ checklist, open, onClose }) => {
// //   const [docs, setDocs] = useState([]);
// //   const [newDocName, setNewDocName] = useState("");
// //   const [selectedCategoryName, setSelectedCategoryName] = useState(null);
// //   const [creatorComment, setCreatorComment] = useState("");
// //   const [checkerComment, setCheckerComment] = useState("");
// //   const [checkerFiles, setCheckerFiles] = useState([]);

// //   const [submitRmChecklist, { isLoading }] = useSubmitChecklistToRMMutation();
// //   const [updateChecklistStatus, { isLoading: isCheckerSubmitting }] =
// //     useUpdateChecklistStatusMutation();
// //   const { data: comments, isLoading: commentsLoading } =
// //     useGetChecklistCommentsQuery(checklist?._id, { skip: !checklist?._id });

// //   // Enable actions if status is pending or co_creator_review
// //   const isActionDisabled = !["pending", "co_creator_review"].includes(
// //     checklist?.status?.toLowerCase()
// //   );

// //   useEffect(() => {
// //     if (!checklist || !checklist.documents) return;

// //     const flatDocs = checklist.documents.reduce((acc, item) => {
// //       if (item.docList && Array.isArray(item.docList) && item.docList.length) {
// //         const nestedDocs = item.docList.map((doc) => ({
// //           ...doc,
// //           category: item.category,
// //         }));
// //         return acc.concat(nestedDocs);
// //       }
// //       if (item.category) return acc.concat(item);
// //       return acc;
// //     }, []);

// //     const preparedDocs = flatDocs.map((doc, idx) => ({
// //       ...doc,
// //       docIdx: idx,
// //       status: doc.status || "pendingrm",
// //       action: doc.status || "pendingrm",
// //       comment: doc.comment || "",
// //       fileUrl: doc.fileUrl || null,
// //     }));

// //     setDocs(preparedDocs);
// //   }, [checklist]);

// //   const handleDelete = (idx) => {
// //     const updated = docs
// //       .filter((_, i) => i !== idx)
// //       .map((doc, i) => ({ ...doc, docIdx: i }));
// //     setDocs(updated);
// //     message.success("Document deleted.");
// //   };

// //   const handleAddNewDocument = () => {
// //     if (!newDocName.trim() || !selectedCategoryName)
// //       return message.error(
// //         "Please enter a document name and select a category."
// //       );
// //     setDocs((prevDocs) => [
// //       ...prevDocs,
// //       {
// //         docIdx: prevDocs.length,
// //         name: newDocName.trim(),
// //         category: selectedCategoryName,
// //         status: "pendingrm",
// //         action: "pendingrm",
// //         comment: "",
// //         fileUrl: null,
// //       },
// //     ]);
// //     message.success(
// //       `Document '${newDocName.trim()}' added to ${selectedCategoryName}.`
// //     );
// //     setNewDocName("");
// //     setSelectedCategoryName(null);
// //   };

// //   const handleActionChange = (idx, value) => {
// //     const updated = [...docs];
// //     updated[idx].action = value;
// //     updated[idx].status = value;
// //     setDocs(updated);
// //   };

// //   const handleCommentChange = (idx, value) => {
// //     const updated = [...docs];
// //     updated[idx].comment = value;
// //     setDocs(updated);
// //   };

// //   // const handleDelete = (idx) => {
// //   //   const updated = docs
// //   //     .filter((_, i) => i !== idx)
// //   //     .map((doc, i) => ({ ...doc, docIdx: i }));
// //   //   setDocs(updated);
// //   //   message.success("Document deleted.");
// //   // };

// //   const handleFileUpload = (docIdx, file) => {
// //     const updated = [...docs];
// //     updated[docIdx].fileUrl = URL.createObjectURL(file);
// //     updated[docIdx].status = "uploaded";
// //     setDocs(updated);
// //     message.success("File uploaded");
// //     return false;
// //   };

// //   const submitToRM = async () => {
// //     try {
// //       if (!checklist?._id) throw new Error("Checklist ID missing");
// //       const nestedDocuments = docs.reduce((acc, doc) => {
// //         let categoryGroup = acc.find((c) => c.category === doc.category);
// //         if (!categoryGroup) {
// //           categoryGroup = { category: doc.category, docList: [] };
// //           acc.push(categoryGroup);
// //         }
// //         categoryGroup.docList.push({
// //           _id: doc._id,
// //           name: doc.name,
// //           category: doc.category,
// //           status: doc.status,
// //           action: doc.action,
// //           comment: doc.comment,
// //           fileUrl: doc.fileUrl,
// //           deferralReason: doc.deferralReason,
// //         });
// //         return acc;
// //       }, []);
// //       const payload = { creatorComment, documents: nestedDocuments };
// //       await submitRmChecklist({ id: checklist._id, body: payload }).unwrap();
// //       message.success("Checklist submitted to RM!");
// //       onClose();
// //     } catch (err) {
// //       console.error(err);
// //       message.error(err?.data?.error || "Failed to submit checklist to RM");
// //     }
// //   };

// //   const submitToCheckers = async () => {
// //     if (!checklist?.dclNo) return message.error("DCL No missing.");
// //     try {
// //       message.loading({
// //         content: "Submitting checklist to Co-Checker...",
// //         key: "checkerSubmit",
// //       });
// //       const payload = {
// //         dclNo: checklist.dclNo,
// //         documents: docs,
// //         status: "co_checker_review",
// //         submittedToCoChecker: true,
// //         finalComment: checkerComment,
// //         attachments: checkerFiles,
// //       };
// //       await updateChecklistStatus(payload).unwrap();
// //       message.success({
// //         content: "Checklist submitted to Co-Checker!",
// //         key: "checkerSubmit",
// //         duration: 3,
// //       });
// //       onClose();
// //     } catch (err) {
// //       console.error(err);
// //       message.error({
// //         content: err?.data?.error || "Failed to submit checklist.",
// //         key: "checkerSubmit",
// //       });
// //     }
// //   };

// //   const uniqueCategories = [...new Set(docs.map((doc) => doc.category))];
// //   const allDocsApproved =
// //     docs.length > 0 && docs.every((doc) => doc.action === "submitted");
// //   const total = docs.length;
// //   const submitted = docs.filter(
// //     (d) => d.action === "submitted" || d.action === "uploaded"
// //   ).length;
// //   const pending = docs.filter((d) =>
// //     ["pendingrm", "pending_from_co", "tbo"].includes(d.action)
// //   ).length;
// //   const deferred = docs.filter((d) => d.action === "deferred").length;
// //   const progressPercent =
// //     total === 0 ? 0 : Math.round((submitted / total) * 100);

// //   const columns = [
// //     {
// //       title: "Category",
// //       dataIndex: "category",
// //       width: 120,
// //       render: (text) => (
// //         <span
// //           style={{ fontSize: 12, color: SECONDARY_PURPLE, fontWeight: 500 }}
// //         >
// //           {text}
// //         </span>
// //       ),
// //     },
// //     {
// //       title: "Document Name",
// //       dataIndex: "name",
// //       width: 250,
// //       render: (text, record) => (
// //         <Input
// //           size="small"
// //           value={record.name}
// //           onChange={(e) => {
// //             const updated = [...docs];
// //             updated[record.docIdx].name = e.target.value;
// //             setDocs(updated);
// //           }}
// //           disabled={isActionDisabled}
// //         />
// //       ),
// //     },
// //     {
// //       title: "Action",
// //       dataIndex: "action",
// //       width: 140,
// //       render: (text, record) => (
// //         <Select
// //           size="small"
// //           value={record.action}
// //           style={{ width: "100%" }}
// //           onChange={(val) => handleActionChange(record.docIdx, val)}
// //           disabled={isActionDisabled}
// //         >
// //           <Option value="submitted">Submitted</Option>
// //           <Option value="pendingrm">Pending from RM</Option>
// //           <Option value="pendingco">Pending from Co</Option>
// //           <Option value="tbo">TBO</Option>
// //           <Option value="sighted">Sighted</Option>
// //           <Option value="waived">Waived</Option>
// //           <Option value="deferred">Deferred</Option>
// //         </Select>
// //       ),
// //     },
// //     {
// //       title: "Co status",
// //       dataIndex: "status",
// //       width: 120,
// //       render: (status) => (
// //         <Tag className="status-tag">{status.replace(/_/g, " ")}</Tag>
// //       ),
// //     },
// //     {
// //       title: "Co comment",
// //       dataIndex: "comment",
// //       width: 200,
// //       render: (text, record) => (
// //         <Input.TextArea
// //           rows={1}
// //           size="small"
// //           value={text}
// //           onChange={(e) => handleCommentChange(record.docIdx, e.target.value)}
// //           disabled={isActionDisabled}
// //         />
// //       ),
// //     },
// //     {
// //       title: "View",
// //       key: "view",
// //       width: 80,
// //       render: (_, record) =>
// //         record.fileUrl ? (
// //           <Button
// //             type="primary"
// //             icon={<EyeOutlined />}
// //             onClick={() => {
// //               const newWindow = window.open(
// //                 record.fileUrl,
// //                 "_blank",
// //                 "noopener,noreferrer"
// //               );
// //               if (!newWindow)
// //                 message.error("Popup blocked! Please allow popups.");
// //             }}
// //             size="small"
// //             style={{
// //               backgroundColor: PRIMARY_BLUE,
// //               borderColor: PRIMARY_BLUE,
// //               borderRadius: 6,
// //             }}
// //             disabled={isActionDisabled}
// //           >
// //             View
// //           </Button>
// //         ) : (
// //           <Tag color="default">No File</Tag>
// //         ),
// //     },
// //     // {
// //     //   title: "Delete",
// //     //   key: "delete",
// //     //   width: 80,
// //     //   render: (_, record) => (
// //     //     <Button
// //     //       type="text"
// //     //       danger
// //     //       size="small"
// //     //       onClick={() => handleDelete(record.docIdx)}
// //     //       disabled={isActionDisabled}
// //     //     >
// //     //       Delete
// //     //     </Button>
// //     //   ),
// //     // },

// //     <Popconfirm
// //       title="Delete document?"
// //       description="This action cannot be undone."
// //       okText="Yes, Delete"
// //       cancelText="Cancel"
// //       okButtonProps={{ danger: true }}
// //       onConfirm={() => handleDelete(index)}
// //     >
// //       <Button type="text" danger size="small">
// //         Delete
// //       </Button>
// //     </Popconfirm>,
// //   ];

// //   return (
// //     <>
// //       <style>{customStyles}</style>
// //       <Modal
// //         title={`Review Checklist  ${checklist?.title || ""}`}
// //         open={open}
// //         onCancel={onClose}
// //         width={1150}
// //         bodyStyle={{ padding: "0 24px 24px" }}
// //         footer={[
// //           <Button key="cancel" onClick={onClose}>
// //             Close
// //           </Button>,
// //           <Button
// //             key="submit"
// //             type="primary"
// //             disabled={isActionDisabled || allDocsApproved}
// //             loading={isLoading}
// //             onClick={submitToRM}
// //           >
// //             Submit to RM
// //           </Button>,
// //         ]}
// //       >
// //         {checklist && (
// //           <>
// //             <Card
// //               className="checklist-info-card"
// //               size="small"
// //               title={
// //                 <span style={{ color: PRIMARY_BLUE, fontSize: 14 }}>
// //                   Checklist Details
// //                 </span>
// //               }
// //               style={{
// //                 marginBottom: 18,
// //                 marginTop: 24,
// //                 borderRadius: 10,
// //                 border: `1px solid #e0e0e0`,
// //               }}
// //             >
// //               <Descriptions size="middle" column={{ xs: 1, sm: 2, lg: 3 }}>
// //                 <Descriptions.Item label="DCL No">
// //                   {checklist.dclNo}
// //                 </Descriptions.Item>
// //                 <Descriptions.Item label="Created At">
// //                   {checklist.createdAt}
// //                 </Descriptions.Item>
// //                 <Descriptions.Item label="Loan Type">
// //                   {checklist.loanType}
// //                 </Descriptions.Item>
// //                 <Descriptions.Item label="Created By">
// //                   {checklist.createdBy?.name}
// //                 </Descriptions.Item>
// //                 <Descriptions.Item label="RM">
// //                   {checklist.assignedToRM?.name}
// //                 </Descriptions.Item>
// //                 <Descriptions.Item label="Co-Checker">
// //                   {checklist.assignedToCoChecker?.name || "Pending"}
// //                 </Descriptions.Item>
// //               </Descriptions>
// //             </Card>

// //             <div
// //               style={{
// //                 padding: "16px",
// //                 background: "#f7f9fc",
// //                 borderRadius: 8,
// //                 border: "1px solid #e0e0e0",
// //                 marginBottom: 18,
// //               }}
// //             >
// //               <div
// //                 style={{
// //                   display: "flex",
// //                   justifyContent: "space-between",
// //                   marginBottom: 12,
// //                 }}
// //               >
// //                 <div style={{ fontWeight: "700", color: PRIMARY_BLUE }}>
// //                   Total: {total}
// //                 </div>
// //                 <div style={{ fontWeight: "700", color: SECONDARY_PURPLE }}>
// //                   Pending: {pending}
// //                 </div>
// //                 <div style={{ fontWeight: "700", color: ACCENT_LIME }}>
// //                   Submitted: {submitted}
// //                 </div>
// //                 <div style={{ fontWeight: "700", color: "#ff4d4f" }}>
// //                   Deferred: {deferred}
// //                 </div>
// //               </div>
// //               <div
// //                 style={{
// //                   width: "100%",
// //                   height: 12,
// //                   background: "#e0e0e0",
// //                   borderRadius: 50,
// //                 }}
// //               >
// //                 <div
// //                   style={{
// //                     height: "100%",
// //                     width: `${progressPercent}%`,
// //                     background: PRIMARY_BLUE,
// //                     borderRadius: 50,
// //                     transition: "width 0.4s ease",
// //                   }}
// //                 ></div>
// //               </div>
// //               <div
// //                 style={{
// //                   textAlign: "right",
// //                   marginTop: 4,
// //                   fontWeight: "700",
// //                   color: PRIMARY_BLUE,
// //                 }}
// //               >
// //                 {progressPercent}%
// //               </div>
// //             </div>

// //             <h3
// //               style={{
// //                 margin: "16px 0 8px",
// //                 color: PRIMARY_BLUE,
// //                 fontWeight: "bold",
// //               }}
// //             >
// //               Add New Document
// //             </h3>
// //             <DocumentInputSection
// //               uniqueCategories={uniqueCategories}
// //               selectedCategoryName={selectedCategoryName}
// //               setSelectedCategoryName={setSelectedCategoryName}
// //               newDocName={newDocName}
// //               setNewDocName={setNewDocName}
// //               loanType={checklist.loanType}
// //               handleAddNewDocument={handleAddNewDocument}
// //               disabled={isActionDisabled}
// //             />

// //             <h3
// //               style={{
// //                 margin: "16px 0 8px",
// //                 color: PRIMARY_BLUE,
// //                 fontWeight: "bold",
// //               }}
// //             >
// //               Required Documents
// //             </h3>
// //             <Table
// //               className="doc-table"
// //               rowKey="docIdx"
// //               size="middle"
// //               pagination={false}
// //               dataSource={docs}
// //               columns={columns}
// //               bordered={false}
// //             />

// //             <h3
// //               style={{
// //                 margin: "24px 0 8px",
// //                 color: PRIMARY_BLUE,
// //                 fontWeight: "bold",
// //               }}
// //             >
// //               Comment Trail
// //             </h3>
// //             <CommentTrail comments={comments} isLoading={commentsLoading} />

// //             {allDocsApproved && (
// //               <div
// //                 id="checker-final-section"
// //                 style={{
// //                   marginTop: 32,
// //                   padding: "20px",
// //                   background: "#fff",
// //                   border: "1px solid #e0e0e0",
// //                   borderRadius: 8,
// //                   marginBottom: 40,
// //                 }}
// //               >
// //                 <h3 style={{ color: PRIMARY_BLUE, fontWeight: "bold" }}>
// //                   Submit to Co-Checker
// //                 </h3>
// //                 <Input.TextArea
// //                   rows={4}
// //                   value={checkerComment}
// //                   onChange={(e) => setCheckerComment(e.target.value)}
// //                   placeholder="Final comment for co-checker..."
// //                   disabled={isActionDisabled}
// //                   style={{ marginBottom: 16 }}
// //                 />
// //                 <Upload
// //                   multiple
// //                   beforeUpload={(file) => {
// //                     handleFileUpload(0, file);
// //                     return false;
// //                   }}
// //                   disabled={isActionDisabled}
// //                 >
// //                   <Button icon={<UploadOutlined />} disabled={isActionDisabled}>
// //                     Upload Files
// //                   </Button>
// //                 </Upload>
// //                 <Button
// //                   type="primary"
// //                   style={{ marginLeft: 12 }}
// //                   onClick={submitToCheckers}
// //                   loading={isCheckerSubmitting}
// //                   disabled={
// //                     isActionDisabled ||
// //                     (checkerFiles.length === 0 && !checkerComment.trim())
// //                   }
// //                 >
// //                   Submit to Checker
// //                 </Button>
// //               </div>
// //             )}
// //           </>
// //         )}
// //       </Modal>
// //     </>
// //   );
// // };

// // export default ReviewChecklistModal;

// import React, { useState, useEffect } from "react";
// import {
//   Button,
//   Table,
//   Tag,
//   Modal,
//   Input,
//   Select,
//   Card,
//   Descriptions,
//   message,
//   Upload,
//   Spin,
//   List,
//   Avatar,
//   Popconfirm,
// } from "antd";
// import { UploadOutlined, EyeOutlined, UserOutlined } from "@ant-design/icons";

// import DocumentInputSection from "../../components/creator/DocumentInputSection";
// import {
//   useSubmitChecklistToRMMutation,
//   useUpdateChecklistStatusMutation,
//   useGetChecklistCommentsQuery,
// } from "../../api/checklistApi";

// const { Option } = Select;

// // Theme Colors
// const PRIMARY_BLUE = "#164679";
// const ACCENT_LIME = "#b5d334";
// const SECONDARY_PURPLE = "#7e6496";

// // Custom CSS
// const customStyles = `
//   .ant-modal-header { background-color: ${PRIMARY_BLUE} !important; padding: 18px 24px !important; }
//   .ant-modal-title { color: white !important; font-size: 1.15rem !important; font-weight: 700 !important; letter-spacing: 0.5px; }
//   .ant-modal-close-x { color: white !important; }

//   .checklist-info-card .ant-card-head { border-bottom: 2px solid ${ACCENT_LIME} !important; }
//   .checklist-info-card .ant-descriptions-item-label { font-weight: 600 !important; color: ${SECONDARY_PURPLE} !important; padding-bottom: 4px; }
//   .checklist-info-card .ant-descriptions-item-content { color: ${PRIMARY_BLUE} !important; font-weight: 700 !important; font-size: 13px !important; }

//   .doc-table.ant-table-wrapper table { border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; }
//   .doc-table .ant-table-thead > tr > th { background-color: #f7f9fc !important; color: ${PRIMARY_BLUE} !important; font-weight: 600 !important; padding: 12px 16px !important; }
//   .doc-table .ant-table-tbody > tr > td { padding: 10px 16px !important; border-bottom: 1px dashed #f0f0f0 !important; }

//   .ant-input, .ant-select-selector { border-radius: 6px !important; border-color: #e0e0e0 !important; }
//   .ant-input:focus, .ant-select-focused .ant-select-selector { box-shadow: 0 0 0 2px rgba(22, 70, 121, 0.2) !important; border-color: ${PRIMARY_BLUE} !important; }

//   .status-tag { font-weight: 700 !important; border-radius: 999px !important; padding: 3px 8px !important; text-transform: capitalize; min-width: 80px; text-align: center; display: inline-flex; align-items: center; gap: 4px; justify-content: center; }

//   .ant-modal-footer .ant-btn { border-radius: 8px; font-weight: 600; height: 38px; padding: 0 16px; }
//   .ant-modal-footer .ant-btn-primary { background-color: ${PRIMARY_BLUE} !important; border-color: ${PRIMARY_BLUE} !important; }
// `;

// // ------------------- STATUS TAG COLORS -------------------
// const renderStatusTag = (status) => {
//   let color = "default";
//   switch ((status || "").toLowerCase()) {
//     case "submitted":
//       color = "green";
//       break;
//     case "pendingrm":
//       color = "red";
//       break;
//     case "deferred":
//     case "waived":
//       color = "orange";
//       break;
//     case "sighted":
//     case "tbo":
//       color = "blue";
//       break;
//     default:
//       color = "default";
//   }
//   return (
//     <Tag className="status-tag" color={color}>
//       {status}
//     </Tag>
//   );
// };

// // ------------------- ROLE TAG -------------------
// const getRoleTag = (role) => {
//   let color = "blue";
//   const roleLower = (role || "").toLowerCase();
//   switch (roleLower) {
//     case "rm":
//       color = "purple";
//       break;
//     case "creator":
//       color = "green";
//       break;
//     case "co_checker":
//       color = "volcano";
//       break;
//     case "system":
//       color = "default";
//       break;
//     default:
//       color = "blue";
//   }
//   return (
//     <Tag color={color} style={{ marginLeft: 8, textTransform: "uppercase" }}>
//       {roleLower.replace(/_/g, " ")}
//     </Tag>
//   );
// };

// // ------------------- COMMENT TRAIL -------------------
// const CommentTrail = ({ comments, isLoading }) => {
//   if (isLoading)
//     return (
//       <div style={{ textAlign: "center", padding: 20 }}>
//         <Spin />
//       </div>
//     );
//   if (!comments || comments.length === 0)
//     return (
//       <div style={{ paddingLeft: 15, borderLeft: `3px solid ${PRIMARY_BLUE}` }}>
//         <i>No historical comments yet.</i>
//       </div>
//     );

//   return (
//     <div style={{ overflowX: "auto", whiteSpace: "nowrap", paddingBottom: 8 }}>
//       <div style={{ display: "inline-flex", gap: 16 }}>
//         {comments.map((item, index) => (
//           <Card
//             key={index}
//             style={{
//               minWidth: 420,
//               maxWidth: 420,
//               borderLeft: `4px solid ${PRIMARY_BLUE}`,
//             }}
//           >
//             <List.Item.Meta
//               avatar={<Avatar icon={<UserOutlined />} />}
//               title={
//                 <div
//                   style={{ display: "flex", justifyContent: "space-between" }}
//                 >
//                   <div>
//                     <b>{item.userId?.name || "System"}</b>{" "}
//                     {getRoleTag(item.userId?.role || "system")}
//                   </div>
//                   <span style={{ fontSize: 12, color: "#888" }}>
//                     {new Date(
//                       item.createdAt || item.timestamp
//                     ).toLocaleString()}
//                   </span>
//                 </div>
//               }
//               description={
//                 <div
//                   style={{
//                     whiteSpace: "normal",
//                     wordBreak: "break-word",
//                     marginTop: 8,
//                   }}
//                 >
//                   {item.message}
//                 </div>
//               }
//             />
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// // ------------------- MAIN MODAL -------------------
// const ReviewChecklistModal = ({ checklist, open, onClose }) => {
//   const [docs, setDocs] = useState([]);
//   const [newDocName, setNewDocName] = useState("");
//   const [selectedCategoryName, setSelectedCategoryName] = useState(null);
//   const [creatorComment, setCreatorComment] = useState("");
//   const [checkerComment, setCheckerComment] = useState("");
//   const [checkerFiles, setCheckerFiles] = useState([]);

//   const [submitRmChecklist, { isLoading }] = useSubmitChecklistToRMMutation();
//   const [updateChecklistStatus, { isLoading: isCheckerSubmitting }] =
//     useUpdateChecklistStatusMutation();
//   const { data: comments, isLoading: commentsLoading } =
//     useGetChecklistCommentsQuery(checklist?._id, { skip: !checklist?._id });

//   const isActionDisabled = !["pending", "co_creator_review"].includes(
//     checklist?.status?.toLowerCase()
//   );

//   useEffect(() => {
//     if (!checklist || !checklist.documents) return;

//     const flatDocs = checklist.documents.reduce((acc, item) => {
//       if (item.docList && Array.isArray(item.docList) && item.docList.length) {
//         const nestedDocs = item.docList.map((doc) => ({
//           ...doc,
//           category: item.category,
//         }));
//         return acc.concat(nestedDocs);
//       }
//       if (item.category) return acc.concat(item);
//       return acc;
//     }, []);

//     const preparedDocs = flatDocs.map((doc, idx) => ({
//       ...doc,
//       docIdx: idx,
//       status: doc.status || "pendingrm",
//       action: doc.status || "pendingrm",
//       comment: doc.comment || "",
//       fileUrl: doc.fileUrl || null,
//     }));

//     setDocs(preparedDocs);
//   }, [checklist]);

//   const handleDelete = (idx) => {
//     const updated = docs
//       .filter((_, i) => i !== idx)
//       .map((doc, i) => ({ ...doc, docIdx: i }));
//     setDocs(updated);
//     message.success("Document deleted.");
//   };

//   const handleAddNewDocument = () => {
//     if (!newDocName.trim() || !selectedCategoryName)
//       return message.error(
//         "Please enter a document name and select a category."
//       );
//     setDocs((prevDocs) => [
//       ...prevDocs,
//       {
//         docIdx: prevDocs.length,
//         name: newDocName.trim(),
//         category: selectedCategoryName,
//         status: "pendingrm",
//         action: "pendingrm",
//         comment: "",
//         fileUrl: null,
//       },
//     ]);
//     message.success(
//       `Document '${newDocName.trim()}' added to ${selectedCategoryName}.`
//     );
//     setNewDocName("");
//     setSelectedCategoryName(null);
//   };

//   const handleActionChange = (idx, value) => {
//     const updated = [...docs];
//     updated[idx].action = value;
//     updated[idx].status = value;
//     setDocs(updated);
//   };

//   const handleCommentChange = (idx, value) => {
//     const updated = [...docs];
//     updated[idx].comment = value;
//     setDocs(updated);
//   };

//   const handleFileUpload = (docIdx, file) => {
//     const updated = [...docs];
//     updated[docIdx].fileUrl = URL.createObjectURL(file);
//     updated[docIdx].status = "uploaded";
//     setDocs(updated);
//     message.success("File uploaded");
//     return false;
//   };

//   const submitToRM = async () => {
//     try {
//       if (!checklist?._id) throw new Error("Checklist ID missing");
//       const nestedDocuments = docs.reduce((acc, doc) => {
//         let categoryGroup = acc.find((c) => c.category === doc.category);
//         if (!categoryGroup) {
//           categoryGroup = { category: doc.category, docList: [] };
//           acc.push(categoryGroup);
//         }
//         categoryGroup.docList.push({
//           _id: doc._id,
//           name: doc.name,
//           category: doc.category,
//           status: doc.status,
//           action: doc.action,
//           comment: doc.comment,
//           fileUrl: doc.fileUrl,
//           deferralReason: doc.deferralReason,
//         });
//         return acc;
//       }, []);
//       const payload = { creatorComment, documents: nestedDocuments };
//       await submitRmChecklist({ id: checklist._id, body: payload }).unwrap();
//       message.success("Checklist submitted to RM!");
//       onClose();
//     } catch (err) {
//       console.error(err);
//       message.error(err?.data?.error || "Failed to submit checklist to RM");
//     }
//   };

//   const submitToCheckers = async () => {
//     if (!checklist?.dclNo) return message.error("DCL No missing.");
//     try {
//       message.loading({
//         content: "Submitting checklist to Co-Checker...",
//         key: "checkerSubmit",
//       });
//       const payload = {
//         dclNo: checklist.dclNo,
//         documents: docs,
//         status: "co_checker_review",
//         submittedToCoChecker: true,
//         finalComment: checkerComment,
//         attachments: checkerFiles,
//       };
//       await updateChecklistStatus(payload).unwrap();
//       message.success({
//         content: "Checklist submitted to Co-Checker!",
//         key: "checkerSubmit",
//         duration: 3,
//       });
//       onClose();
//     } catch (err) {
//       console.error(err);
//       message.error({
//         content: err?.data?.error || "Failed to submit checklist.",
//         key: "checkerSubmit",
//       });
//     }
//   };

//   const uniqueCategories = [...new Set(docs.map((doc) => doc.category))];
//   const allDocsApproved =
//     docs.length > 0 && docs.every((doc) => doc.action === "submitted");
//   const total = docs.length;
//   const submitted = docs.filter(
//     (d) => d.action === "submitted" || d.action === "uploaded"
//   ).length;
//   const pending = docs.filter((d) =>
//     ["pendingrm", "pending_from_co", "tbo"].includes(d.action)
//   ).length;
//   const deferred = docs.filter((d) => d.action === "deferred").length;
//   const progressPercent =
//     total === 0 ? 0 : Math.round((submitted / total) * 100);

//   const columns = [
//     {
//       title: "Category",
//       dataIndex: "category",
//       width: 120,
//       render: (text) => (
//         <span
//           style={{ fontSize: 12, color: SECONDARY_PURPLE, fontWeight: 500 }}
//         >
//           {text}
//         </span>
//       ),
//     },
//     {
//       title: "Document Name",
//       dataIndex: "name",
//       width: 250,
//       render: (text, record) => (
//         <Input
//           size="small"
//           value={record.name}
//           onChange={(e) => {
//             const updated = [...docs];
//             updated[record.docIdx].name = e.target.value;
//             setDocs(updated);
//           }}
//           disabled={isActionDisabled}
//         />
//       ),
//     },
//     {
//       title: "Action",
//       dataIndex: "action",
//       width: 140,
//       render: (text, record) => (
//         <Select
//           size="small"
//           value={record.action}
//           style={{ width: "100%" }}
//           onChange={(val) => handleActionChange(record.docIdx, val)}
//           disabled={isActionDisabled}
//         >
//           <Option value="submitted">Submitted</Option>
//           <Option value="pendingrm">Pending from RM</Option>
//           <Option value="pendingco">Pending from Co</Option>
//           <Option value="tbo">TBO</Option>
//           <Option value="sighted">Sighted</Option>
//           <Option value="waived">Waived</Option>
//           <Option value="deferred">Deferred</Option>
//         </Select>
//       ),
//     },
//     {
//       title: "Co status",
//       dataIndex: "status",
//       width: 120,
//       render: (status) => renderStatusTag(status), // ✅ colored status tag
//     },
//     {
//       title: "Co comment",
//       dataIndex: "comment",
//       width: 200,
//       render: (text, record) => (
//         <Input.TextArea
//           rows={1}
//           size="small"
//           value={text}
//           onChange={(e) => handleCommentChange(record.docIdx, e.target.value)}
//           disabled={isActionDisabled}
//         />
//       ),
//     },
//     {
//       title: "View",
//       key: "view",
//       width: 80,
//       render: (_, record) =>
//         record.fileUrl ? (
//           <Button
//             type="primary"
//             icon={<EyeOutlined />}
//             onClick={() => {
//               const newWindow = window.open(
//                 record.fileUrl,
//                 "_blank",
//                 "noopener,noreferrer"
//               );
//               if (!newWindow)
//                 message.error("Popup blocked! Please allow popups.");
//             }}
//             size="small"
//             style={{
//               backgroundColor: PRIMARY_BLUE,
//               borderColor: PRIMARY_BLUE,
//               borderRadius: 6,
//             }}
//             disabled={isActionDisabled}
//           >
//             View
//           </Button>
//         ) : (
//           <Tag color="default">No File</Tag>
//         ),
//     },
//     {
//       title: "Delete",
//       key: "delete",
//       width: 80,
//       render: (_, record, index) => (
//         <Popconfirm
//           title="Delete document?"
//           description="This action cannot be undone."
//           okText="Yes, Delete"
//           cancelText="Cancel"
//           okButtonProps={{ danger: true }}
//           onConfirm={() => handleDelete(record.docIdx)}
//         >
//           <Button type="text" danger size="small" disabled={isActionDisabled}>
//             Delete
//           </Button>
//         </Popconfirm>
//       ),
//     },
//   ];

//   return (
//     <>
//       <style>{customStyles}</style>
//       <Modal
//         title={`Review Checklist  ${checklist?.title || ""}`}
//         open={open}
//         onCancel={onClose}
//         width={1150}
//         bodyStyle={{ padding: "0 24px 24px" }}
//         footer={[
//           <Button key="cancel" onClick={onClose}>
//             Close
//           </Button>,
//           <Button
//             key="submit"
//             type="primary"
//             disabled={isActionDisabled || allDocsApproved}
//             loading={isLoading}
//             onClick={submitToRM}
//           >
//             Submit to RM
//           </Button>,
//         ]}
//       >
//         {/* rest of your modal JSX stays exactly the same */}
//         {/* including cards, table, comment trail, and co-checker section */}
//       </Modal>
//     </>
//   );
// };

// export default ReviewChecklistModal;
import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Tag,
  Modal,
  Input,
  Select,
  Card,
  Descriptions,
  message,
  Upload,
  Spin,
  List,
  Avatar,
  Popconfirm,
  Progress,
} from "antd";
import { UploadOutlined, EyeOutlined, UserOutlined } from "@ant-design/icons";

import DocumentInputSection from "../../components/creator/DocumentInputSection";
import {
  useSubmitChecklistToRMMutation,
  useUpdateChecklistStatusMutation,
  useGetChecklistCommentsQuery,
} from "../../api/checklistApi";

const { Option } = Select;

// Theme Colors
const PRIMARY_BLUE = "#164679";
const ACCENT_LIME = "#b5d334";
const SECONDARY_PURPLE = "#7e6496";

// Custom CSS
const customStyles = `
  .ant-modal-header { background-color: ${PRIMARY_BLUE} !important; padding: 18px 24px !important; }
  .ant-modal-title { color: white !important; font-size: 1.15rem !important; font-weight: 700 !important; letter-spacing: 0.5px; }
  .ant-modal-close-x { color: white !important; }

  .checklist-info-card .ant-card-head { border-bottom: 2px solid ${ACCENT_LIME} !important; }
  .checklist-info-card .ant-descriptions-item-label { font-weight: 600 !important; color: ${SECONDARY_PURPLE} !important; padding-bottom: 4px; }
  .checklist-info-card .ant-descriptions-item-content { color: ${PRIMARY_BLUE} !important; font-weight: 700 !important; font-size: 13px !important; }

  .doc-table.ant-table-wrapper table { border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; }
  .doc-table .ant-table-thead > tr > th { background-color: #f7f9fc !important; color: ${PRIMARY_BLUE} !important; font-weight: 600 !important; padding: 12px 16px !important; }
  .doc-table .ant-table-tbody > tr > td { padding: 10px 16px !important; border-bottom: 1px dashed #f0f0f0 !important; }

  .ant-input, .ant-select-selector { border-radius: 6px !important; border-color: #e0e0e0 !important; }
  .ant-input:focus, .ant-select-focused .ant-select-selector { box-shadow: 0 0 0 2px rgba(22, 70, 121, 0.2) !important; border-color: ${PRIMARY_BLUE} !important; }

  .status-tag { font-weight: 700 !important; border-radius: 999px !important; padding: 3px 8px !important; text-transform: capitalize; min-width: 80px; text-align: center; display: inline-flex; align-items: center; gap: 4px; justify-content: center; }

  .ant-modal-footer .ant-btn { border-radius: 8px; font-weight: 600; height: 38px; padding: 0 16px; }
  .ant-modal-footer .ant-btn-primary { background-color: ${PRIMARY_BLUE} !important; border-color: ${PRIMARY_BLUE} !important; }
`;

const getRoleTag = (role) => {
  let color = "blue";
  const roleLower = (role || "").toLowerCase();
  switch (roleLower) {
    case "rm":
      color = "purple";
      break;
    case "creator":
      color = "green";
      break;
    case "co_checker":
      color = "volcano";
      break;
    case "system":
      color = "default";
      break;
    default:
      color = "blue";
  }
  return (
    <Tag color={color} style={{ marginLeft: 8, textTransform: "uppercase" }}>
      {roleLower.replace(/_/g, " ")}
    </Tag>
  );
};

const CommentTrail = ({ comments, isLoading }) => {
  if (isLoading)
    return (
      <div style={{ textAlign: "center", padding: 20 }}>
        <Spin />
      </div>
    );
  if (!comments || comments.length === 0)
    return (
      <div style={{ paddingLeft: 15, borderLeft: `3px solid ${PRIMARY_BLUE}` }}>
        <i>No historical comments yet.</i>
      </div>
    );

  return (
    <div style={{ overflowX: "auto", whiteSpace: "nowrap", paddingBottom: 8 }}>
      <div style={{ display: "inline-flex", gap: 16 }}>
        {comments.map((item, index) => (
          <Card
            key={index}
            style={{
              minWidth: 420,
              maxWidth: 420,
              borderLeft: `4px solid ${PRIMARY_BLUE}`,
            }}
          >
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <b>{item.userId?.name || "System"}</b>{" "}
                    {getRoleTag(item.userId?.role || "system")}
                  </div>
                  <span style={{ fontSize: 12, color: "#888" }}>
                    {new Date(
                      item.createdAt || item.timestamp
                    ).toLocaleString()}
                  </span>
                </div>
              }
              description={
                <div
                  style={{
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                    marginTop: 8,
                  }}
                >
                  {item.message}
                </div>
              }
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

const ReviewChecklistModal = ({ checklist, open, onClose }) => {
  const [docs, setDocs] = useState([]);
  const [newDocName, setNewDocName] = useState("");
  const [selectedCategoryName, setSelectedCategoryName] = useState(null);
  const [creatorComment, setCreatorComment] = useState("");
  const [checkerComment] = useState("");
  const [checkerFiles, setCheckerFiles] = useState([]);

  const [submitRmChecklist, { isLoading }] = useSubmitChecklistToRMMutation();
  const [updateChecklistStatus, { isLoading: isCheckerSubmitting }] =
    useUpdateChecklistStatusMutation();
  const { data: comments, isLoading: commentsLoading } =
    useGetChecklistCommentsQuery(checklist?._id, { skip: !checklist?._id });

  // Enable actions if status is pending or co_creator_review
  const isActionDisabled = !["pending", "co_creator_review"].includes(
    checklist?.status?.toLowerCase()
  );

  useEffect(() => {
    if (!checklist || !checklist.documents) return;

    const flatDocs = checklist.documents.reduce((acc, item) => {
      if (item.docList && Array.isArray(item.docList) && item.docList.length) {
        const nestedDocs = item.docList.map((doc) => ({
          ...doc,
          category: item.category,
        }));
        return acc.concat(nestedDocs);
      }
      if (item.category) return acc.concat(item);
      return acc;
    }, []);

    const preparedDocs = flatDocs.map((doc, idx) => ({
      ...doc,
      docIdx: idx,
      status: doc.status || "pendingrm",
      action: doc.status || "pendingrm",
      comment: doc.comment || "",
      fileUrl: doc.fileUrl || null,
    }));

    setDocs(preparedDocs);
  }, [checklist]);

  const handleDelete = (idx) => {
    const updated = docs
      .filter((_, i) => i !== idx)
      .map((doc, i) => ({ ...doc, docIdx: i }));
    setDocs(updated);
    message.success("Document deleted.");
  };

  // post comment

  const handlePostCreatorComment = () => {
    if (!creatorComment.trim()) {
      message.error("Comment cannot be empty");
      return;
    }

    message.success("Comment added");
  };

  const handleAddNewDocument = () => {
    if (!newDocName.trim() || !selectedCategoryName)
      return message.error(
        "Please enter a document name and select a category."
      );
    setDocs((prevDocs) => [
      ...prevDocs,
      {
        docIdx: prevDocs.length,
        name: newDocName.trim(),
        category: selectedCategoryName,
        status: "pendingrm",
        action: "pendingrm",
        comment: "",
        fileUrl: null,
      },
    ]);
    message.success(
      `Document '${newDocName.trim()}' added to ${selectedCategoryName}.`
    );
    setNewDocName("");
    setSelectedCategoryName(null);
  };

  const handleActionChange = (idx, value) => {
    const updated = [...docs];
    updated[idx].action = value;
    updated[idx].status = value;
    setDocs(updated);
  };

  const handleCommentChange = (idx, value) => {
    const updated = [...docs];
    updated[idx].comment = value;
    setDocs(updated);
  };

  const handleFileUpload = (docIdx, file) => {
    const updated = [...docs];
    updated[docIdx].fileUrl = URL.createObjectURL(file);
    updated[docIdx].status = "uploaded";
    setDocs(updated);
    message.success("File uploaded");
    return false;
  };

  const ALLOWED_DOC_ACTIONS = [
    "pendingco",
    "submitted_for_review",
    "sighted",
    "waived",
    "deferred",
    "tbo",
    "approved",
    "submitted",
  ];

  const canSubmitToCoChecker =
    checklist?.status === "co_creator_review" &&
    docs.length > 0 &&
    docs.every((doc) =>
      ALLOWED_DOC_ACTIONS.includes((doc.action || "").toLowerCase())
    );

  const submitToRM = async () => {
    try {
      if (!checklist?._id) throw new Error("Checklist ID missing");
      const nestedDocuments = docs.reduce((acc, doc) => {
        let categoryGroup = acc.find((c) => c.category === doc.category);
        if (!categoryGroup) {
          categoryGroup = { category: doc.category, docList: [] };
          acc.push(categoryGroup);
        }
        categoryGroup.docList.push({
          _id: doc._id,
          name: doc.name,
          category: doc.category,
          status: doc.status,
          action: doc.action,
          comment: doc.comment,
          fileUrl: doc.fileUrl,
          deferralReason: doc.deferralReason,
        });
        return acc;
      }, []);
      const payload = { creatorComment, documents: nestedDocuments };
      await submitRmChecklist({ id: checklist._id, body: payload }).unwrap();
      message.success("Checklist submitted to RM!");
      onClose();
    } catch (err) {
      console.error(err);
      message.error(err?.data?.error || "Failed to submit checklist to RM");
    }
  };

  const submitToCheckers = async () => {
    if (!checklist?.dclNo) return message.error("DCL No missing.");
    try {
      message.loading({
        content: "Submitting checklist to Co-Checker...",
        key: "checkerSubmit",
      });
      const payload = {
        dclNo: checklist.dclNo,
        documents: docs,
        status: "co_checker_review",
        submittedToCoChecker: true,
        finalComment: checkerComment,
        attachments: checkerFiles,
      };
      await updateChecklistStatus(payload).unwrap();
      message.success({
        content: "Checklist submitted to Co-Checker!",
        key: "checkerSubmit",
        duration: 3,
      });
      onClose();
    } catch (err) {
      console.error(err);
      message.error({
        content: err?.data?.error || "Failed to submit checklist.",
        key: "checkerSubmit",
      });
    }
  };

  const uniqueCategories = [...new Set(docs.map((doc) => doc.category))];
  const allDocsApproved =
    docs.length > 0 && docs.every((doc) => doc.action === "submitted");
  const total = docs.length;
  const submitted = docs.filter(
    (d) => d.action === "submitted" || d.action === "uploaded"
  ).length;
  const pending = docs.filter((d) =>
    ["pendingrm", "pendingco", "tbo"].includes(d.action)
  ).length;
  const deferred = docs.filter((d) => d.action === "deferred").length;
  const progressPercent =
    total === 0 ? 0 : Math.round((submitted / total) * 100);

  const columns = [
    {
      title: "Category",
      dataIndex: "category",
      width: 120,
      render: (text) => (
        <span
          style={{ fontSize: 12, color: SECONDARY_PURPLE, fontWeight: 500 }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Document Name",
      dataIndex: "name",
      width: 250,
      render: (text, record) => (
        <Input
          size="small"
          value={record.name}
          onChange={(e) => {
            const updated = [...docs];
            updated[record.docIdx].name = e.target.value;
            setDocs(updated);
          }}
          disabled={isActionDisabled}
        />
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      width: 140,
      render: (text, record) => (
        <Select
          size="small"
          value={record.action}
          style={{ width: "100%" }}
          onChange={(val) => handleActionChange(record.docIdx, val)}
          disabled={isActionDisabled}
        >
          <Option value="submitted">Submitted</Option>
          <Option value="pendingrm">Pending from RM</Option>
          <Option value="pendingco">Pending from Co</Option>
          <Option value="tbo">TBO</Option>
          <Option value="sighted">Sighted</Option>
          <Option value="waived">Waived</Option>
          <Option value="deferred">Deferred</Option>
        </Select>
      ),
    },
    {
      title: "Co status",
      dataIndex: "status",
      width: 120,
      render: (status) => {
        let color = "default";
        switch ((status || "").toLowerCase()) {
          case "submitted":
            color = "green";
            break;
          case "pendingrm":
            color = "red";
            break;
          case "deferred":
          case "waived":
            color = "orange";
            break;
          case "sighted":
          case "tbo":
            color = "blue";
            break;
          default:
            color = "default";
        }
        return (
          <Tag className="status-tag" color={color}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Co comment",
      dataIndex: "comment",
      width: 200,
      render: (text, record) => (
        <Input.TextArea
          rows={1}
          size="small"
          value={text}
          onChange={(e) => handleCommentChange(record.docIdx, e.target.value)}
          disabled={isActionDisabled}
        />
      ),
    },
    {
      title: "View",
      key: "view",
      width: 80,
      render: (_, record) =>
        record.fileUrl ? (
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => {
              const newWindow = window.open(
                record.fileUrl,
                "_blank",
                "noopener,noreferrer"
              );
              if (!newWindow)
                message.error("Popup blocked! Please allow popups.");
            }}
            size="small"
            style={{
              backgroundColor: PRIMARY_BLUE,
              borderColor: PRIMARY_BLUE,
              borderRadius: 6,
            }}
            disabled={isActionDisabled}
          >
            View
          </Button>
        ) : (
          <Tag color="default">No File</Tag>
        ),
    },
    {
      title: "Delete",
      key: "delete",
      width: 80,
      render: (_, record) => (
        <Popconfirm
          title="Delete document?"
          description="This action cannot be undone."
          okText="Yes, Delete"
          cancelText="Cancel"
          okButtonProps={{ danger: true }}
          onConfirm={() => handleDelete(record.docIdx)}
        >
          <Button type="text" danger size="small" disabled={isActionDisabled}>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <style>{customStyles}</style>
      <Modal
        title={`Review Checklist  ${checklist?.title || ""}`}
        open={open}
        onCancel={onClose}
        width={1150}
        bodyStyle={{ padding: "0 24px 24px" }}
        footer={[
          <Button key="cancel" onClick={onClose}>
            Close
          </Button>,
          <Button
            key="submit"
            type="primary"
            disabled={isActionDisabled || allDocsApproved}
            loading={isLoading}
            onClick={submitToRM}
          >
            Submit to RM
          </Button>,

          // <Button
          //   key="submit-checker"
          //   type="primary"
          //   loading={isCheckerSubmitting}
          //   onClick={submitToCheckers}
          //   disabled={checklist?.status !== "rm_review" || docs.length === 0}
          // >
          //   Submit to Co-Checker
          // </Button>,

          <Button
            key="submit-checker"
            type="primary"
            loading={isCheckerSubmitting}
            onClick={submitToCheckers}
            disabled={!canSubmitToCoChecker}
          >
            Submit to Co-Checker
          </Button>,
        ]}
      >
        {checklist && (
          <>
            <Card
              className="checklist-info-card"
              size="small"
              title={
                <span style={{ color: PRIMARY_BLUE, fontSize: 14 }}>
                  Checklist Details
                </span>
              }
              style={{
                marginBottom: 18,
                marginTop: 24,
                borderRadius: 10,
                border: `1px solid #e0e0e0`,
              }}
            >
              <Descriptions size="middle" column={{ xs: 1, sm: 2, lg: 3 }}>
                <Descriptions.Item label="DCL No">
                  {checklist.dclNo}
                </Descriptions.Item>
                <Descriptions.Item label="Created At">
                  {checklist.createdAt}
                </Descriptions.Item>
                <Descriptions.Item label="Loan Type">
                  {checklist.loanType}
                </Descriptions.Item>
                <Descriptions.Item label="Created By">
                  {checklist.createdBy?.name}
                </Descriptions.Item>
                <Descriptions.Item label="RM">
                  {checklist.assignedToRM?.name}
                </Descriptions.Item>
                <Descriptions.Item label="Co-Checker">
                  {checklist.assignedToCoChecker?.name || "Pending"}
                </Descriptions.Item>
              </Descriptions>
            </Card>

            <div
              style={{
                padding: "16px",
                background: "#f7f9fc",
                borderRadius: 8,
                border: "1px solid #e0e0e0",
                marginBottom: 18,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 12,
                }}
              >
                <div style={{ fontWeight: "700", color: PRIMARY_BLUE }}>
                  Total: {total}
                </div>
                <div style={{ fontWeight: "700", color: SECONDARY_PURPLE }}>
                  Pending: {pending}
                </div>
                <div style={{ fontWeight: "700", color: "green" }}>
                  Submitted: {submitted}
                </div>
                <div style={{ fontWeight: "700", color: "orange" }}>
                  Deferred: {deferred}
                </div>
              </div>
              <Progress percent={progressPercent} />
            </div>

            <Table
              className="doc-table"
              columns={columns}
              dataSource={docs}
              pagination={false}
              rowKey="docIdx"
              size="small"
              scroll={{ x: "max-content" }}
            />

            <div style={{ marginTop: 18 }}>
              <DocumentInputSection
                uniqueCategories={uniqueCategories}
                newDocName={newDocName}
                setNewDocName={setNewDocName}
                selectedCategoryName={selectedCategoryName}
                setSelectedCategoryName={setSelectedCategoryName}
                handleAddNewDocument={handleAddNewDocument}
              />
            </div>

            <div style={{ marginTop: 24 }}>
              <h4>Creator Comment</h4>

              <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
                <Input.TextArea
                  rows={2}
                  value={creatorComment}
                  onChange={(e) => setCreatorComment(e.target.value)}
                  disabled={isActionDisabled}
                  placeholder="Add a comment for RM / Co-Checker"
                />

                <Button
                  type="primary"
                  onClick={handlePostCreatorComment}
                  disabled={isActionDisabled || !creatorComment.trim()}
                  style={{
                    height: 38,
                    backgroundColor: PRIMARY_BLUE,
                    borderColor: PRIMARY_BLUE,
                  }}
                >
                  Post Comment
                </Button>
              </div>
            </div>

            <div style={{ marginTop: 24 }}>
              <h4>Comment Trail & History</h4>
              <CommentTrail comments={comments} isLoading={commentsLoading} />
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default ReviewChecklistModal;
