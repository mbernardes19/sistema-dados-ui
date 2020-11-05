import { FunctionComponent } from "react";
import OrderedItem from '../model/ordered-item';
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, makeStyles } from "@material-ui/core";
import { format, addDays } from 'date-fns';


type ItemsTableProps = {
    orderedItems: OrderedItem[]
}

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });


export const ItemsTable: FunctionComponent<ItemsTableProps> = ({orderedItems}) => {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
        <Table className={classes.table}  size='small'>
            <TableHead>
                <TableRow>
                    <TableCell>Número</TableCell>
                    <TableCell>Qtd. solicitada</TableCell>
                    <TableCell>Qtd. pendente</TableCell>
                    <TableCell>Qtd. liberada</TableCell>
                    <TableCell>Situação</TableCell>
                    <TableCell>Data de entrega</TableCell>
                    <TableCell>Cód. Prod/Serv</TableCell>
                    <TableCell>Nome Prod/Serv</TableCell>
                    <TableCell>Comp. Prod/Serv</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    orderedItems && orderedItems.map(orderedItem => (
                        <TableRow key={orderedItem.id}>
                            <TableCell component='th' scope='row'>
                                {orderedItem.item.number}
                            </TableCell>
                            <TableCell>
                                {orderedItem.requestedQuantity}
                            </TableCell>
                            <TableCell>
                                {orderedItem.pendingQuantity}
                            </TableCell>
                            <TableCell>
                                {orderedItem.availableQuantity}
                            </TableCell>
                            <TableCell>
                                {orderedItem.status}
                            </TableCell>
                            <TableCell>
                                {format(addDays(new Date(orderedItem.deliveryDate), 1), 'dd/MM/yyyy')}
                            </TableCell>
                            <TableCell>
                                {orderedItem.prodServInfo.code}
                            </TableCell>
                            <TableCell>
                                {orderedItem.prodServInfo.name}
                            </TableCell>
                            <TableCell>
                                {orderedItem.prodServInfo.complement}
                            </TableCell>
                        </TableRow>  
                    ))
                }
            </TableBody>
        </Table>
    </TableContainer>
    )
}