import React, { Component } from "react";
import { Title } from "react-admin";
import TimelineLoaded from "./TimelineLoaded";

export class Timeline extends Component {
  page = 1;
  constructor(props) {
    super(props);
    this.state = {
      events: [
        {
          id: 1234,
          label: 'modified post "Hello World"',
          createdAt: "2019-01-10T17:15:56.000Z",
          author: {
            name: "John Doe",
            email: "jitewaboh@lagify.com",
          },
        },
        {
          id: 1233,
          label: 'created new post "Hello World"',
          createdAt: "2019-01-10T16:34:00.000Z",
          author: {
            name: "John Doe",
            email: "jitewaboh@lagify.com",
          },
        },
        {
          id: 1232,
          label:
            "commented \"I don't agree. You should never try to do things this way, or you'll end up in a bad place.\"",
          createdAt: "2019-01-09T15:53:56.000Z",
          author: {
            name: "Lela Feng",
            email: "lelafeng@example.com",
          },
        },
        {
          id: 1231,
          label: 'deleted comment "Totally."',
          createdAt: "2019-01-09T11:04:56.000Z",
          author: {
            name: "Brandon Hood",
            email: "brandon@example.com",
          },
        },
        {
          id: 1230,
          label: 'liked "Lorem Ipsum"',
          createdAt: "2019-01-09T09:12:56.000Z",
          author: {
            name: "John Doe",
            email: "jitewaboh@lagify.com",
          },
        },
        {
          id: 1224,
          label: 'modified post "Lorem Ipsum"',
          createdAt: "2019-01-07T16:15:56.000Z",
          author: {
            name: "John Doe",
            email: "jitewaboh@lagify.com",
          },
        },
        {
          id: 1223,
          label: 'created new post "Lorem Ipsum"',
          createdAt: "2019-01-06T15:34:00.000Z",
          author: {
            name: "John Doe",
            email: "jitewaboh@lagify.com",
          },
        },
        {
          id: 1222,
          label: 'deleted comment "Super Bueno!"',
          createdAt: "2019-01-06T11:04:56.000Z",
          author: {
            name: "Brandon Hood",
            email: "brandon@example.com",
          },
        },
        {
          id: 1221,
          label: 'commented "Super bueno!"',
          createdAt: "2019-01-06T09:53:56.000Z",
          author: {
            name: "Johnny B. Good",
            email: "johnny@example.com",
          },
        },
        {
          id: 1220,
          label: 'liked "Sic dolor"',
          createdAt: "2019-01-05T09:12:56.000Z",
          author: {
            name: "John Doe",
            email: "jitewaboh@lagify.com",
          },
        },
        {
          id: 1214,
          label: 'modified post "Sic dolor"',
          createdAt: "2019-01-05T07:15:56.000Z",
          author: {
            name: "John Doe",
            email: "jitewaboh@lagify.com",
          },
        },
        {
          id: 1213,
          label: 'created new post "Sic dolor"',
          createdAt: "2019-01-03T16:34:00.000Z",
          author: {
            name: "John Doe",
            email: "jitewaboh@lagify.com",
          },
        },
        {
          id: 1212,
          label: 'commented "If only this could be true..."',
          createdAt: "2019-01-03T15:53:56.000Z",
          author: {
            name: "Lela Feng",
            email: "lelafeng@example.com",
          },
        },
      ], //props.ids.map(id => props.data[id]),
      latestId: props.ids[props.ids.length - 1],
    };
  }

  updateData = () => {
    // this.props.crudGetList(
    //   "events",
    //   { page: this.page, perPage: 5 },
    //   { field: "id", order: "DESC" }
    // );
  };

  componentDidMount() {
    this.updateData();
  }

  componentWillUnmount() {
    this.page = 1;
    this.updateData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.ids !== prevProps.ids) {
      const { ids, data } = this.props;
      const latestId = ids[ids.length - 1];
      if (latestId && latestId !== prevState.latestId) {
        const newEvents = ids.map((id) => data[id]);
        this.setState((state) => ({
          events: state.events.concat(newEvents),
          latestId,
        }));
      }
    }
  }

  handleLoadMore = () => {
    this.page = this.page + 1;
    this.updateData();
  };

  render() {
    const { events } = this.state;
    const { total, loadedOnce } = this.props;
    return (
      <TimelineLoaded
        events={events}
        total={total}
        handleLoadMore={this.handleLoadMore}
      />
    );
  }
}

Timeline.defaultProps = {
  ids: [],
  data: {},
  //   crudGetList: () => null,
};

const mapStateToProps = (state) => ({
  ids: state.admin.resources.events.list.ids,
  data: state.admin.resources.events.data,
  total: state.admin.resources.events.list.total,
  loadedOnce: state.admin.resources.events.list.loadedOnce,
});

export default Timeline;
