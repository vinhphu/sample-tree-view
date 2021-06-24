import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import { MinusSquare, PlusSquare } from '../icons';
import Transition from './Transition';
import { TreeView, TreeItem } from '@material-ui/lab';
import _ from 'lodash';
const StyledTreeItem = withStyles((theme) => ({
  iconContainer: {
    '& .close': {
      opacity: 0.3,
    },
    width: '16px',
    color: theme.palette.primary.main
  },
  group: {
    marginLeft: 7,
    paddingLeft: 18,
    borderLeft: `1px dashed ${fade(theme.palette.primary.main, 0.4)}`,
  },
  label: {
    color: theme.palette.text.primary,
    paddingLeft: '5px',
    top: '-5px',
    lineHeight: 1.8,
    '&:hover': {
      backgroundColor: 'rgba(25, 118, 210, 0.08) !important',
    }
  }
}))((props) =>
  <TreeItem {...props} TransitionComponent={Transition} />);

const useStyles = makeStyles( (theme) => ({
  root: {
    height: 'auto',
    flexGrow: 1,
    width: '100%',
  },
  highlight: {
    [theme.breakpoints.only('xs')]: {
      fontSize: '15px'
    },
    color: theme.palette.primary.main,
    fontWeight: '600'
  },
  truncated: {
    [theme.breakpoints.only('xs')]: {
      fontSize: '15px'
    },
  }
}));

const SmarterTreeView = props => {
  const { data, onClickOption, highlight } = props
  
  const classes = useStyles();

  const renderTree = (nodes = data) => {
    
    return <>
      {
        nodes.map((node, index) => {
          console.log('Data nodes ', node)
          
          return <StyledTreeItem
            id={node.nodeDetails.icd10Code}
            key={node.nodeDetails.icd10Code}
            nodeId={node.nodeDetails.icd10Code}
            label={computeLabel(node.nodeDetails)}
          >
            {Array.isArray(node.children) && node.children.length !== 0 ? renderTree(node.children) : null}
          </StyledTreeItem>
        })
      }
    </>
  }

  const computeLabel = (nodeDetail) => {
    const { icd10Code, icd10Description } = nodeDetail;
    const highlightIndex = icd10Description.indexOf(highlight)
    let result =
      <div
        onClick={event => {
          event.preventDefault()
    
        }}
      ><span className={classes.truncated} style={{width: '100%'}}>{icd10Code} - {icd10Description}</span></div>
    if (highlightIndex !== -1 && !_.isEmpty(highlight)) {
      const previous = icd10Description.slice(0, highlightIndex)
      const after = icd10Description.slice(highlightIndex + highlight.length, icd10Description.length)
      result =
        <div
          onClick={event => {
            event.preventDefault()
            
          }}
        >
          <span className={classes.truncated}>{icd10Code} - {previous}</span><span className={classes.highlight}>{highlight}</span><span className={classes.truncated}>{after}</span>
        </div>
    }
    return result
  }

  const getNodeIds = (nodes = data, nodeIds = []) =>{
    nodes.map(node =>{
      if (Array.isArray(node.children) && node.children.length !== 0) {
        nodeIds.push(node.nodeDetails.icd10Code)
        getNodeIds(node.children, nodeIds)
      }
    } )
    return nodeIds
  }

  useEffect(() => {
    if (data && data.length !== 0) {
      renderTree()
    }
  }, [data])

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<MinusSquare />}
      defaultExpandIcon={<PlusSquare />}
      defaultExpanded={getNodeIds(data,[])}
    >
      {renderTree(data)}
    </TreeView>
  );
}
SmarterTreeView.propTypes = {
  data: PropTypes.array,
  highlight: PropTypes.string,
  onClickOption: PropTypes.func
}

SmarterTreeView.defaultProps = {
  data: [],
  highlight: '',
  onClickOption: () => {}
}
export default SmarterTreeView;