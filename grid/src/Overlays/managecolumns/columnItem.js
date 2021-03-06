import React from "react";
import { useDrag, useDrop } from "react-dnd";
import PropTypes from "prop-types";
import { ItemTypes } from "./ItemTypes";
import { IconJustify } from "../../Utilities/SvgUtilities";

const ColumnItem = ({
    id,
    Header,
    moveColumn,
    findColumn,
    originalInnerCells,
    isInnerCellSelected,
    selectInnerCells
}) => {
    const originalIndex = findColumn(id).index;

    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.COLUMN, id, originalIndex },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        }),
        end: (dropResult, monitor) => {
            const monitorGetItemValue = monitor.getItem();
            const { id: droppedId } = monitorGetItemValue;
            const newOriginalIndex = monitorGetItemValue.originalIndex;
            const didDrop = monitor.didDrop();
            if (!didDrop) {
                moveColumn(droppedId, newOriginalIndex);
            }
        }
    });

    const [, drop] = useDrop({
        accept: ItemTypes.COLUMN,
        canDrop: () => false,
        hover({ id: draggedId }) {
            if (draggedId !== id) {
                const { index: overIndex } = findColumn(id);
                moveColumn(draggedId, overIndex);
            }
        }
    });

    const opacity = isDragging ? 0.1 : 1;

    return (
        <div style={{ opacity }}>
            <div className="column__reorder">
                <div
                    data-testid="columnItem"
                    ref={(node) => drag(drop(node))}
                    style={{ cursor: "move" }}
                    className="column_drag"
                >
                    <i>
                        <IconJustify />
                    </i>
                </div>
                <div>{Header}</div>
                <div className="column__innerCells__wrap">
                    {originalInnerCells && originalInnerCells.length > 0
                        ? originalInnerCells.map((cell) => {
                              return (
                                  <div
                                      className="column__wrap"
                                      key={`${cell.Header}_${cell.accessor}`}
                                  >
                                      <div className="column__checkbox">
                                          <input
                                              type="checkbox"
                                              data-columnheader={Header}
                                              value={cell.Header}
                                              checked={isInnerCellSelected(
                                                  Header,
                                                  cell.Header
                                              )}
                                              onChange={selectInnerCells}
                                          />
                                      </div>
                                      <div className="column__txt">
                                          {cell.Header}
                                      </div>
                                  </div>
                              );
                          })
                        : null}
                </div>
            </div>
        </div>
    );
};

ColumnItem.propTypes = {
    id: PropTypes.any,
    Header: PropTypes.any,
    moveColumn: PropTypes.any,
    findColumn: PropTypes.any,
    originalInnerCells: PropTypes.any,
    isInnerCellSelected: PropTypes.any,
    selectInnerCells: PropTypes.any
};

export default ColumnItem;
