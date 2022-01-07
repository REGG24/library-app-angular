import { Author } from "./author";
import { Book } from "./book";
import { Client } from "./client";
import { Employee } from "./employee";
import { Loan } from "./loan";
import { Return } from "./return";
import { Sale } from "./sale";

export interface CustomResponse { 
    timeStamp: Date;
    statusCode: number;
    status: string;
    reason: string;
    message: string;
    developerMessage: string;
    data: { 
        employees?: Employee[], 
        clients?: Client[],
        books?: Book[],
        authors?: Author[],
        sales?: Sale[],
        loans?: Loan[],
        returns?: Return[]
    }
}