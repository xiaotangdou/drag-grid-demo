/**
 * title: Overview
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import { connect } from 'dva'
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale'

import styles from './index.less'

class Overview extends Component {
  static propTypes = {
    loading: PropTypes.object,
    overview: PropTypes.object,
    dispatch: PropTypes.func
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'overview/queryTodoList'
    })
  }

  getColumns = () => {
    return [
      {
        title: formatMessage({
          id: 'OVERVIEW_NO'
        }),
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: formatMessage({
          id: 'OVERVIEW_TASK'
        }),
        dataIndex: 'task',
        key: 'task'
      },
      {
        title: formatMessage({
          id: 'OVERVIEW_COMPLETED_STATUS'
        }),
        dataIndex: 'completed',
        key: 'completed',
        render: (text, record) => {
          if (record.completed) {
            return (
              <span className={styles.finished}>
                <FormattedMessage id="OVERVIEW_FINISHED" />
              </span>
            )
          }
          return (
            <span className={styles.unfinished}>
              <FormattedMessage id="OVERVIEW_UNFINISHED" />
            </span>
          )
        }
      }
    ]
  }

  render() {
    const { overview } = this.props
    return (
      <div>
        <Table rowKey="id" columns={this.getColumns()} dataSource={overview.todoList} />
      </div>
    )
  }
}

export default connect(({ overview, app, loading }) => {
  return {
    loading,
    overview
  }
})(Overview)
