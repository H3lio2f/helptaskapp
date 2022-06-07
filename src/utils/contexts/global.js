import { createContext, useContext, useState } from "react";

const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
  const [showNewTask, setShowNewTask] = useState(false);
  const [showNewClient, setShowNewClient] = useState(false);
  const [showNewConfiguration, setShowNewConfiguration] = useState(false);
  const [showTaskConfig, setShowTaskConfig] = useState(false);
  const [showChannelConfig, setShowChannelConfig] = useState(false);
  const [showGroupConfig, setShowGroupConfig] = useState(false);
  const [showTypeConfig, setShowTypeConfig] = useState(false);
  const [showClientConfig, setShowClientConfig] = useState(false);
  const [showAgentConfig, setShowAgentConfig] = useState(false);
  const [isOpenAgent, setIsOpenAgent] = useState(false);
  const [isOpenUser, setIsOpenUser] = useState(false);
  const [isOpenType, setIsOpenType] = useState(false);
  const [isOpenClient, setIsOpenClient] = useState(false);
  const [isOpenGroup, setIsOpenGroup] = useState(false);
  const [isOpenForward, setIsOpenForward] = useState(false);
  const [isOpenChannel, setIsOpenChannel] = useState(false);
  const [isOpenImportExcel, setIsOpenImportExcel] = useState(false);
  const [seeClient, setSeeClient] = useState(false);
  const [seeTask, setSeeTask] = useState(false);
  const [showUserConfig, setShowUserConfig] = useState(false);
  const [openReply, setOpenReply] = useState(false);
  const [actionDone, setActionDone] = useState(false);
  const [loading, setLoading] = useState(true);
  const [all, setAll] = useState();
  const [refresh, setRefresh] = useState(false);
  const [showAttribueted, setShowAttribueted] = useState(false);
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [clients, setClients] = useState([]);
  const [status, setStatus] = useState([]);
  const [groups, setGroups] = useState([]);
  const [types, setTypes] = useState([]);
  const [filteredLate, setFilteredLate] = useState([]);
  return (
    <GlobalContext.Provider
      value={{
        showNewTask,
        setShowNewTask,
        showNewClient,
        setShowNewClient,
        showNewConfiguration,
        setShowNewConfiguration,
        showTaskConfig,
        setShowTaskConfig,
        showClientConfig,
        setShowClientConfig,
        showUserConfig,
        setShowUserConfig,
        openReply,
        setOpenReply,
        actionDone,
        setActionDone,
        seeClient,
        setSeeClient,
        seeTask,
        setSeeTask,
        loading,
        setLoading,
        tasks,
        setTasks,
        all,
        setAll,
        showChannelConfig,
        setShowChannelConfig,
        showGroupConfig,
        setShowGroupConfig,
        showTypeConfig,
        setShowTypeConfig,
        isOpenChannel,
        setIsOpenChannel,
        isOpenGroup,
        setIsOpenGroup,
        isOpenType,
        setIsOpenType,
        isOpenAgent,
        setIsOpenAgent,
        isOpenUser,
        setIsOpenUser,
        showAgentConfig, setShowAgentConfig,
        isOpenImportExcel, setIsOpenImportExcel,
        isOpenForward, setIsOpenForward,
        refresh, setRefresh,
        showAttribueted, setShowAttribueted,
        user, setUser,
        users, setUsers,
        tasks, setTasks,
        filteredLate, setFilteredLate,
        status, setStatus,
        isOpenClient, setIsOpenClient,
        groups, setGroups,
        types, setTypes,
        clients, setClients
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  return context;
};

export default GlobalContext;
