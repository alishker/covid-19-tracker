import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core';

function InfoBox({ title, cases, total }) {
    return (
        <div>
            {/** title i.e corona virus cases */}
            <Card>
                <CardContent>
                    <Typography>
                        {title}
                    </Typography>
                    <h2> {cases}</h2>
                    <Typography>
                        {total}
                    </Typography>
                </CardContent>
            </Card>



        </div>
    )
}

export default InfoBox
