// components/NodeDialog.js
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';

const NodeDialog = ({ compoundListOpen, selectedNode, currentCompounds, activeNodes, handleCompoundSelect, handlePlaySound, setCompoundListOpen }) => {
  return (
    <Dialog open={compoundListOpen} onClose={() => setCompoundListOpen(false)}>
      <DialogTitle>{selectedNode?.name} ({selectedNode?.translation})</DialogTitle>
      <DialogContent>
        <div className="grid-row" style={{ marginBottom: '30px' }}>
          <div className="grid-item" style={{ background: "url('/placeholder.jpg') no-repeat center/cover" }}>
            {/* <div className="grid-label">Image</div> */}
          </div>
          <div className="grid-item" style={{ background: "url('/video-placeholder.jpg') no-repeat center/cover" }}>
            {/* <div className="grid-label">Video Link</div> */}
          </div>
          <div className="grid-item" style={{ background: "url('/sound-placeholder.png') no-repeat center/cover" }} onClick={() => handlePlaySound(selectedNode.name)}>
            <div className="grid-label">Play Sound</div>
          </div>
        </div>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>Words</TableCell>
                {/* <TableCell style={{ fontWeight: 'bold' }}>Translation</TableCell> */}
                <TableCell style={{ fontWeight: 'bold' }}>Sound</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentCompounds.map((compound) => {
                const isCompoundExisting = activeNodes.some(node => node.name === compound.name);

                return (
                  <TableRow
                    key={compound.name}
                    hover
                    style={{ backgroundColor: isCompoundExisting ? '#ccc' : 'transparent', cursor: isCompoundExisting ? 'not-allowed' : 'pointer' }}
                  >
                    <TableCell>{compound.name}<br/><span style={{fontSize:'11px'}}>({compound.translation})</span></TableCell>
                    {/* <TableCell></TableCell> */}
                    <TableCell><Button onClick={() => handlePlaySound(compound.name)}><PlayArrow/></Button></TableCell>
                    <TableCell>
                      <Button className="name-submit" style={{ color: 'white', backgroundColor: "#1778f2" }} onClick={!isCompoundExisting ? () => handleCompoundSelect(compound) : null}>
                        Add
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setCompoundListOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NodeDialog;
