const jsontoxml = ({ name, code, description, qtde, value }) => 
    `<?xml version="1.0" encoding="UTF-8"?>
    <pedido>
        <cliente>
            <nome>
                ${name}
            </nome>
        </cliente>
        <itens>
            <item>
                <codigo>
                    ${code}
                </codigo>
                <descricao>
                    ${description}
                </descricao>
                <qtde>
                    ${qtde}
                </qtde>
                <vlr_unit>
                    ${value}
                </vlr_unit>
            </item>
        </itens>
    </pedido>`

export default jsontoxml;