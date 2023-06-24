import React, { Component } from 'react'
import { Card, Table, Tag, Tooltip, message, Button } from 'antd';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import UserView from 'views/app-views/pages/user-list/UserView';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import { fetchUsers, getCurrentUser } from 'store/slices/userSlice';
import { connect } from 'react-redux';
import { REGISTRY_ENTRY} from 'configs/AppConfig';
import { Link } from 'react-router-dom';
import Loading from 'components/shared-components/Loading';

const mapStateToProps = (state) => ({
	userState: state.userSlice,
  });

export class UserList extends Component {

	state = {
		userProfileVisible: false,
		selectedUser: null,
		dataUsers: [],
		currentUser: null,
		error: this.props.userState.error,
	}

	deleteUser = userId => {
		this.setState({
			dataUsers: this.state.dataUsers.filter(item => item.id !== userId),
		})
		message.success({ content: `Deleted user ${userId}`, duration: 2 });
	}

	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(fetchUsers()).then(response => {
		  this.setState({
			dataUsers: response.payload,
		  });
		});
	}
	
	filterUsers = (userId) => {
		const { dispatch } = this.props;
		dispatch(getCurrentUser(this.state.dataUsers.filter(item => item.id === userId)))
	}

	showUserProfile = userInfo => {
		this.setState({
			userProfileVisible: true,
			selectedUser: userInfo
		});
		
	};
	
	closeUserProfile = () => {
		this.setState({
			userProfileVisible: false,
			selectedUser: null
    });
	}

	render() {
		const { userProfileVisible, selectedUser, dataUsers } = this.state;
		const tableColumns = [
			{
				title: 'User',
				dataIndex: 'username',
				render: (_, record) => (
					<div className="d-flex"   >
						<Link to={REGISTRY_ENTRY} onClick={()=> {this.filterUsers(record.id)}}> 
							<AvatarStatus src={record.img} name={record.name} subTitle={record.email}/>
						</Link>
					</div>
				),
				sorter: {
					compare: (a, b) => {
						a = a.username.toLowerCase();
  						b = b.username.toLowerCase();
						return a > b ? -1 : b > a ? 1 : 0;
					},
				},
			},
			{
				title: 'Role',
				dataIndex: 'name',
				sorter: {
					compare: (a, b) => a.name.length - b.name.length,
				},
			},
			// {
			// 	title: 'Last online',
			// 	dataIndex: 'lastOnline',
			// 	render: date => (
			// 		<span>{dayjs.unix(date).format("MM/DD/YYYY")} </span>
			// 	),
			// 	sorter: (a, b) => dayjs(a.lastOnline).unix() - dayjs(b.lastOnline).unix()
			// },
			{
				title: 'Status',
				dataIndex: 'website',
				render: status => (
					<Tag className ="text-capitalize" color={status === 'active'? 'cyan' : 'red'}>{status}</Tag>
				),
				sorter: {
					compare: (a, b) => a.website.length - b.website.length,
				},
			},
			{
				title: '',
				dataIndex: 'actions',
				render: (_, elm) => (
					<div className="text-right d-flex justify-content-end">
						<Tooltip title="View">
							<Button type="primary" className="mr-2" icon={<EyeOutlined />} onClick={() => {this.showUserProfile(elm)}} size="small"/>
						</Tooltip>
						<Tooltip title="Delete">
							<Button danger icon={<DeleteOutlined />} onClick={()=> {this.deleteUser(elm.id)}} size="small"/>
						</Tooltip>
					</div>
				)
			}
		];
		return (
      !this.props.userState.isLoad ? <Loading />
      :
			<Card bodyStyle={{'padding': '0px'}}>
				<div className="table-responsive">
					<Table columns={tableColumns} dataSource={dataUsers } rowKey='id' />
				</div>
				<UserView data={selectedUser} visible={userProfileVisible} close={()=> {this.closeUserProfile()}}/>
			</Card>
		)
	}
}
export default connect(mapStateToProps)(UserList);
